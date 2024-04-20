// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const setRouter = require('../../app/route/route');
const router = express.Router();

const bodyParser = require('body-parser');
const appconfig = require('../../app/config/appConfig');

// Create an instance of Express
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setRouter.setRouter(app);

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Set up the server to listen on a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


mongoose.connect(appconfig.db.uri, { useUnifiedTopology: true, useNewUrlParser: true })

mongoose.connection.on('error', () => {
    console.log('data base connection is error')
})

mongoose.connection.on('open', () => {
    console.log('data base connection is open')
})

// Export the handler function
exports.handler = async (event, context) => {
    // Use express's built-in request handling
    return new Promise((resolve, reject) => {
        // Express app will automatically handle the request
        app(event, context, (error) => {
            console.log(event)
            console.log(context)
            console.log(error)
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};