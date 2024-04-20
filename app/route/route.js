const controller = require('./../controller/usercontroller')
const appConfig = require('./../config/appConfig');

let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}`;
    app.post(`${baseUrl}/signup`, controller.signup);
}

module.exports = {
    setRouter: setRouter
}