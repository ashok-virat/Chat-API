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
    // const headers = {
    //     'Content-Type': 'text/event-stream',
    //     'Connection': 'keep-alive',
    //     'Cache-Control': 'no-cache'
    // };
    // res.setHeader('Content-Type', 'text/event-stream');
    // res.setHeader('Cache-Control', 'no-cache');
    // res.setHeader('Connection', 'keep-alive');
    let count = 0;
    setInterval(() => {
        res.write('Data 3\n');
        count = count + 1
        if (count == 5) {
            res.end();
        }
    }, 2000);
})

setRouter.setRouter(router);

api.use("/api/", router);

module.exports.handler = serverless(api);
