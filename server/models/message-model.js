const mongoose = require('mongoose');

// Creates schema for messages
const msgSchema = mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true
        },
    },
    users: Array,
    userSender: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users',
        required: true
    }
})

module.exports = mongoose.model("Msgs", msgSchema);