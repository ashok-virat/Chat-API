const mongoose = require('mongoose');
const userpath = require('./../model/userModel');
const userModel = mongoose.model('User');
const messagepath = require('./../model/chatModel');
const messageModel = mongoose.model('Message');
const imagepath = require('./../model/imageModel');
const imageModel = mongoose.model('Image');


let signup = async (req, res) => {
    try {
        let createnewuser = new userModel({
            email: req.body.email,
            status: req.body.status,
            password: req.body.password,
            userName: req.body.userName,
        })
        const findUser = await userModel.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] })
        if (findUser) {
            res.send('use different email and username')
        }
        else {
            createnewuser.save()
                .then(result => {
                    res.send(result);
                })
                .catch(err => {
                    res.status(401).send('User Is Not Created');
                });
        }
    }
    catch (e) {
        res.send(e)
    }
}

const login = async (req, res) => {
    try {
        const data = await userModel.findOne({
            $or: [
                { email: req.body.email },
                { userName: req.body.userName }
            ],
            password: req.body.password
        });
        if (data) {
            res.status(200).send(data)
        }
        else {
            res.status(401).send('Invalid email/username or password');
        }
    }
    catch (e) {
        res.send(e)
    }
}


const getuser = async (req, res) => {
    try {
        const data = await userModel.findOne({ _id: req.params.userid })
        res.send(data)
    }
    catch (e) {
        res.send(e)
    }
}

const getAllusers = async (req, res) => {
    try {
        const data = await userModel.find().select('-password');
        res.send(data)
    }
    catch (e) {
        res.send(e)
    }
}

async function createMessage(req, res) {
    try {
        const newMessage = new messageModel({
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            sender: req.body.sender,
            receiver: req.body.receiver,
            message: req.body.message
        });
        const data = await newMessage.save();
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

// Retrieve messages based on sender and receiver
async function getMessages(req, res) {
    try {
        const messages = await messageModel.find({
            $or: [
                { senderId: req.body.senderId, receiverId: req.body.receiverId },
                { senderId: req.body.receiverId, receiverId: req.body.senderId }
            ]
        })
        res.send(messages)
    } catch (error) {
        res.send(error)
    }
}


async function storeImgaes(req, res) {
    try {
        const image = new imageModel({
            image: req?.file?.path ? req.file.path : '',
            postStatus: req.body.postStatus,
            text: req.body.text,
            userName: req.body.userName,
            userId: req.body.userId
        });
        await image.save();

        res.send('Post uploaded successfully');
    } catch (error) {

        res.status(500).send('Error Posting story');
    }
}


async function getUserStories(req, res) {
    try {
        const stories = await imageModel.find()
        res.send(stories)
    } catch (error) {
        res.send(error)
    }
}

async function getUserStory(req, res) {
    try {
        const stories = await imageModel.find({ userId: req.params.userId })
        res.send(stories)
    } catch (error) {
        res.send(error)
    }
}


module.exports = {
    signup: signup,
    getuser: getuser,
    login: login,
    getAllusers: getAllusers,
    createMessage: createMessage,
    getMessages: getMessages,
    storeImgaes: storeImgaes,
    getUserStories: getUserStories,
    getUserStory: getUserStory
}