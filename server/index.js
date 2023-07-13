// npm i express cors
// npm init -y
// nodemon server/server.js
// Set up cors & express, cors, json, app listen

// Require express
const express = require('express');

// Require cors
const cors = require('cors')

// Create a variable called app and set its value equal to express invoked
const app = express()

// Set your server up to accept JSON object responses
app.use(express.json())

// Allow our express server to use the cors package
app.use(cors())

// Create a variable that requires your controller file
const {getHouses, deleteHouse, createHouse, updateHouse} = require('./controller')

// Setup an endpoint to get all houses // get
app.get('./api/houses', getHouses)

// Setup an endpoint to create a house // post
app.post('./api/houses', createHouse)

// Setup an endpoint to update a house // put
app.put('./api/houses/:id', updateHouse)

// Setup an endpoint to delete a house // delete
app.delete('./api/houses/:id', deleteHouse)


// Set your express server to listen to requests on port 4000, test with nodemon
const SERVER_PORT = 4004;
app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))