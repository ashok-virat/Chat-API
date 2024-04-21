const express = require('express')
const serverless = require('serverless-http')
const { Router } = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appconfig = require('../../app/config/appConfig');
const setRouter = require('../../app/route/route');
const cors = require('cors'); // Add this line

const api = express();

api.use(cors());

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

const router = Router();

mongoose.connect(appconfig.db.uri, { useUnifiedTopology: true, useNewUrlParser: true })

mongoose.connection.on('error', () => {
    console.log('data base connection is error')
})

mongoose.connection.on('open', () => {
    console.log('data base connection is open')
})

router.get('/', (req, res) => {
    // Setting up the content type
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Sending the first chunk
    res.write('This is the first chunk\n');

    // Flushing the buffer to send the first chunk immediately
    res.flush();

    // Send additional data every second
    // const interval = setInterval(() => {
    //     res.write('Streaming data...\n');
    //     res.flush();
    // }, 1000);

    // Close the connection after 10 seconds
    // setTimeout(() => {
    //     clearInterval(interval);
    //     res.end('Streaming finished');
    // }, 10000);
    res.end('Streaming finished');
})

setRouter.setRouter(router);

api.use("/api/", router);

module.exports.handler = serverless(api);
