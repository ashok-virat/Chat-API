const controller = require('../controller/userController.js')
const appConfig = require('../config/appConfig.js');

let clients = [];
const wsConnection = async (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    res.write(`data: ${JSON.stringify('connection established')}\n\n`);
    clients.push(res)
    res.send('hi')
};

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}`;
    app.post(`${baseUrl}/signup`, controller.signup);
    app.get(`${baseUrl}/getuser/:userid`, controller.getuser);
    app.post(`${baseUrl}/login`, controller.login);
    app.get(`${baseUrl}/getusers`, controller.getAllusers);
    app.post(`${baseUrl}/createMessage`, app.post(`${baseUrl}/createMessage`, (req, res) => {
        controller.createMessage(req, res, clients);
    }));
    app.post(`${baseUrl}/getMessages`, controller.getMessages);
    app.get(`${baseUrl}/socket`, wsConnection);
}

module.exports = {
    setRouter: setRouter
}