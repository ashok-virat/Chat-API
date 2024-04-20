const express = require('express')
const serverless = require('serverless-http')
const { Router } = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appconfig = require('../../app/config/appConfig');
const controller = require('../../app/controller/userController')

const api = express();

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

router.get("/hello", async (req, res) => {
    try {
        res.send('hi')
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/signup", controller.signup);

api.use("/api/", router);

module.exports.handler = serverless(api);
