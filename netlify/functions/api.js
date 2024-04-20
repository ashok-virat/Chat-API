const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/hello", (req, res) => res.send("Hello World!"));

module.exports.handler = serverless(app);
