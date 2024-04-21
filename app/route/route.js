const controller = require('../controller/userController.js')
const appConfig = require('../config/appConfig.js');

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}`;
    app.post(`${baseUrl}/signup`, controller.signup);
    app.get(`${baseUrl}/getuser/:userid`, controller.getuser);
    app.post(`${baseUrl}/login`, controller.login);
    app.get(`${baseUrl}/getusers`, controller.getAllusers);
    app.post(`${baseUrl}/createMessage`, controller.createMessage);
    app.post(`${baseUrl}/getMessages`, controller.getMessages);
}

module.exports = {
    setRouter: setRouter
}