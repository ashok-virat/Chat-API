const mongoose = require('mongoose');
const setRouter = require('../../app/route/route');
const bodyParser = require('body-parser');
const appconfig = require('../../app/config/appConfig');

// Define your routes
const routes = {
    '/': (req, res) => {
        res.send('Hello, world!');
    },
    '/other-route': (req, res) => {
        res.send('This is another route');
    }
};

exports.handler = async (event, context) => {
    // Create an instance of Express
    const express = require('express');
    const app = express();

    // Set up middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Initialize your routes
    Object.entries(routes).forEach(([route, handler]) => {
        app.get(route, handler);
    });

    // Connect to MongoDB
    await mongoose.connect(appconfig.db.uri, { useUnifiedTopology: true, useNewUrlParser: true });

    // Log MongoDB connection status
    mongoose.connection.on('error', () => {
        console.log('Database connection error');
    });

    mongoose.connection.on('open', () => {
        console.log('Database connection open');
    });

    // Handle incoming requests
    const { httpMethod, path } = event;
    const req = { method: httpMethod, url: path };
    const res = {
        send: (body) => ({
            statusCode: 200,
            body: JSON.stringify(body)
        })
    };

    // Pass the request through Express middleware and routes
    app(req, res);

    // Close MongoDB connection after handling the request
    await mongoose.disconnect();

    // Return the response
    return res;
};
