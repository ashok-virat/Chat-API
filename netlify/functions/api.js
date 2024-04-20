const express = require('express')
const serverless = require('serverless-http')
const { Router } = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appconfig = require('../../app/config/appConfig');

const api = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = Router();
router.get("/hello", async (req, res) => {
    try {
        mongoose.connect(appconfig.db.uri, { useUnifiedTopology: true, useNewUrlParser: true })

        mongoose.connection.on('error', () => {
            console.log('data base connection is error')
        })

        mongoose.connection.on('open', () => {
            res.send('data base connection is open')
            console.log('data base connection is open')
        })

    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

api.use("/api/", router);

module.exports.handler = serverless(api);
