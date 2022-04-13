const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        maximum: 24,
        unique: true,
    },
    password: {
        type: String,
        required: true, 
        min: 8,
    }
});

module.exports = mongoose.model("Users", userSchema);