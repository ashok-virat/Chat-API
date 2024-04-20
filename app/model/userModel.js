const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userModel = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
})


mongoose.model('User', userModel);