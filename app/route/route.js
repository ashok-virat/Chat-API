const controller = require('../controller/userController.js')
const appConfig = require('../config/appConfig.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})


let setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}`;
    app.get(`${baseUrl}/loop`, async (req, res) => {
        // blocking loop
        for (let i = 0; i <= 100000; i++) {
            console.log(i)
        }
        res.send('hi')
    });
    app.get(`${baseUrl}/get`, (req, res) => {
        setTimeout(() => {
            console.log('hello')
            res.send(Promise.resolve(100))
        }, 5000);
    });
    app.post(`${baseUrl}/signup`, controller.signup);
    app.get(`${baseUrl}/getuser/:userid`, controller.getuser);
    app.post(`${baseUrl}/login`, controller.login);
    app.get(`${baseUrl}/getusers`, controller.getAllusers);
    app.post(`${baseUrl}/createMessage`, app.post(`${baseUrl}/createMessage`, (req, res) => {
        controller.createMessage(req, res);
    }));
    app.post(`${baseUrl}/getMessages`, controller.getMessages);
    app.post(`${baseUrl}/post`, upload.single('image'), controller.storeImgaes);
    app.get(`${baseUrl}/getUserStory/:userId`, controller.getUserStory);
    app.get(`${baseUrl}/getUserStories`, controller.getUserStories);
}

module.exports = {
    setRouter: setRouter
}