// hello.js

const express = require('express');
const router = require('../../index'); // Import your API routes
const app = express();

// Use the API routes as middleware
app.use(router);

exports.handler = async (event, context) => {
    // Your serverless function logic here
};
