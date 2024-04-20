// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/hello", (req, res) => res.send("Hello World!"));

// app.use(router);

exports.handler = serverless(app);
