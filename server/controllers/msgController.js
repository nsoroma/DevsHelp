// Requires Message Schema
const Msgs = require('../models/message-model');

// Retrieve messages
const getMsgs = async (req, res, next) => {
    try {
        const { sender, receiver } = req.body;

        // Finds all messages from specific sender and receiver 
        const msgs = await Msgs.find({
            users: {
                $all: [sender, receiver],
            },
        })

        // Maps over messages and returns _id, fromSelf, and message
        const shownMessages = msgs.map((msg) => {
            return {
                _id: msg._id,
                fromSelf: msg.userSender.toString() === sender,
                message: msg.message.text,
            };
        });

        // Returns results
        res.json(shownMessages);
    } catch (error) {
        next(error)
    }
};

// Sends messages
const addMsg = async (req, res, next) => {
    try {
        const { sender, receiver, msg } = req.body;

        // Creates message
        const msgSent = await Msgs.create({
            message: { text: msg },
            users: [sender, receiver],
            userSender: sender
        });

        // Returns message
        res.json(msgSent);
    } catch (error) {
        next(error);
    }
}

// Exports controllers
module.exports = { getMsgs, addMsg };