const Msgs = require('../models/message-model');

const getMsgs = async (req, res, next) => {
    try {
        const { sender, receiver } = req.body;

        const msgs = await Msgs.find({
            users: {
                $all: [sender, receiver],
            },
        })

        const shownMessages = msgs.map((msg) => {
            return {
                fromSelf: msg.userSender.toString() === sender,
                message: msg.message.text,
            };
        });
        res.json(shownMessages);
    } catch (error) {
        next(error)
    }
};

const addMsg = async (req, res, next) => {
    try {
        const { sender, receiver, msg } = req.body;
        const msgSent = await Msgs.create({
            message: { text: msg },
            users: [sender, receiver],
            userSender: sender
        });

        res.json(msgSent);
    } catch (error) {
        next(error);
    }
}

module.exports = { getMsgs, addMsg };