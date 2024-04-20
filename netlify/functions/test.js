// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

const express = require('express');
const serverless = require('serverless-http');
const router = express.Router();

const api = express();

router.get("/hello", (req, res) => res.send("Hello World!"));

api.use(router);

exports.handler = serverless(api);
