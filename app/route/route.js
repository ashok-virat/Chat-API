const controller = require('../controller/userController.js')
const appConfig = require('../config/appConfig.js');

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}`;
    app.post(`${baseUrl}/signup`, controller.signup);
    app.get(`${baseUrl}/getuser/:userid`, controller.getuser);
    app.post(`${baseUrl}/login`, controller.login);
}

module.exports = {
    setRouter: setRouter
}