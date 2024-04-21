const express = require('express')
const serverless = require('serverless-http')
const { Router } = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appconfig = require('../../app/config/appConfig');
const setRouter = require('../../app/route/route');
const cors = require('cors'); // Add this line
const http = require('http');
const socket = require('../../app/lib/socket');

const api = express();

api.use(cors());

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

const router = Router();

const server = http.createServer(api);
socket.setServer(server);

mongoose.connect(appconfig.db.uri, { useUnifiedTopology: true, useNewUrlParser: true })

mongoose.connection.on('error', () => {
    console.log('data base connection is error')
})

mongoose.connection.on('open', () => {
    console.log('data base connection is open')
})

setRouter.setRouter(router);

api.use("/api/", router);

module.exports.handler = serverless(api);
