/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = ',&appid=f8d1c7741d9ff2f7e77a52da47ce3ea7&units=imperial';

// The base URL for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// local server 
const server = "http://127.0.0.1:4000";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleString('default', {weekday: 'long'}) + ', ' + d.getDate() + ' ' + d.toLocaleString('default', {
    month: 'short'
}) + ' ' + d.getFullYear();

let time = d.getHours() + ':' + d.getMinutes().toString().padStart(2, '0') + " - ";



// an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
document.getElementById('generate').addEventListener('click', actInTheCaseOfClick);


function actInTheCaseOfClick(e) {
    // get the value from the input with id 'zip' in HTML 
    let zipInput = document.getElementById('zip');
    let zipCode = zipInput.value;

    // get the value from the input with id 'feelings' in HTML 
    let feelingsInput = document.getElementById('feelings');
    let userFeelings = feelingsInput.value;

    // a async GET request with the parameters:base url, user entered zip code, personal API key
    getWeather(baseURL, zipCode, apiKey)
        .then(function (data) {
            // console.log("weather: ", data["weather"][0].main)
            const postedData = {
                date: newDate,
                temp: data['main'].temp, // to get integer number
                feelings: userFeelings,
                city: data['name'],
                weather: data["weather"][0].main,
                time: time,
                Cloudy: data["clouds"].all,
                Humidity: data['main'].humidity,
                Wind: data['wind'].speed,
                Rain: data['sys'].type,
            };

            // use then. to retrive data when data is completely posted
            postweather(server + "/add", postedData).then(
                retrieveData()
            )
        })
}


//  an async function that uses fetch() to make a GET request to the OpenWeatherMap API.
const getWeather = async (baseURL, zipValue, apiKey) => {

    const res = await fetch(baseURL + zipValue + apiKey);
    try {
        const data = await res.json();
        //console.log("You Get [getWeather()]:", data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}



// a async function to make this POST request to add the API data, as well as data entered by the user.
const postweather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json",
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        //console.log("You saved:", newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


// Function to GET Project Data
// to retrieve data from our app, select the necessary elements on the DOM, and then update their necessary values to reflect the dynamic values
const retrieveData = async () => {
    const request = await fetch(server + '/all');
    try {
        // Transform into JSON
        const allData = await request.json();
        //console.log("retrived data:", newData);

        // Write updated data to DOM elements
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + "°";
        document.getElementById('content').innerHTML = allData.feelings;
        document.getElementById('city').innerHTML = allData.city;
        document.getElementById('time').innerHTML = allData.time;

        document.getElementById('Cloudy').innerHTML = allData.Cloudy + "%";
        document.getElementById('Humidity').innerHTML = allData.Humidity + "%";
        document.getElementById('Wind').innerHTML = allData.Wind + "Km/h";
        document.getElementById('Rain').innerHTML = allData.Rain + "mm";


        if (allData.weather == "Rain") {
            document.body.style.backgroundImage = "url('image/Rainy [1920x1080].jpg')"; //changing bg image         
        } else if (allData.weather == "Clear") {
            document.body.style.backgroundImage = "url('image/pexels-photo-281260 (1).webp')"; //changing bg image         
        } else if (allData.weather == "Clouds") {
            document.body.style.backgroundImage = "url('image/sky-clouds-4k-ja-1536x864.jpg')"; //changing bg image
        }
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};