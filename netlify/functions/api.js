const express = require('express')
const serverless = require(serverless - http)
const { Router } = require("express");

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

module.exports.handler = serverless(api);
