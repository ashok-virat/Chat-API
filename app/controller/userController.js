const mongoose = require('mongoose');

const userpath = require('./../model/userModel');
const userModel = mongoose.model('User');


let signup = (req, res) => {
    console.log(req.body)
    let createnewuser = new userModel({
        email: req.body.email,
        status: req.body.status,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    createnewuser.save()
        .then(result => {
            // Handle successful save
            res.send(result);
        })
        .catch(err => {
            // Handle error
            console.error(err);
            res.send('User Is Not Created');
        });
}

module.exports = {
    signup: signup,
}