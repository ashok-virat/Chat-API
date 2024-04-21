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
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    req.write(200, headers)
    res.writeHead(200, headers);
    // Function to send events
    function sendEvent(data) {
        res.write(`data: ${data}\n\n`);
    }

    // Send multiple events
    sendEvent('Data 1');
    setTimeout(() => sendEvent('Data 2'), 2000); // Send 'Data 2' after 2 seconds
    setTimeout(() => sendEvent('Data 3'), 4000); // Send 'Data 3' after 4 seconds
})

setRouter.setRouter(router);

api.use("/api/", router);

module.exports.handler = serverless(api);
