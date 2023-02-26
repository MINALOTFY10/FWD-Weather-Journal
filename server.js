// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
/* Dependencies */
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 4000;
const hostname = "127.0.0.1";

/* Spin up the server*/
const server = app.listen(port, listening);

// test if the server is working
function listening() {
   //console.log(`running on localhost: ${port}`);
   console.log(`Server running at http://${hostname}:${port}/`);
};


// a GET route that returns the projectData object
app.get('/getWeather', getWeatherData)

function getWeatherData(req, res) {
   res.send(projectData);
}


// a POST route that adds incoming data to projectData.
app.post("/add", addWeatherData)

//The POST route anticipate receiving three pieces of data from the request body temperature, date, user response
function addWeatherData(req, res) {
   projectData = req.body;
   console.log(projectData);
   res.status(200).send(projectData);
}


// get all data
app.get('/all', getAllData);

function getAllData(req, res) {
  res.status(200).send(projectData);
  res.send(projectData);
  console.log("get all data: ",projectData);
};