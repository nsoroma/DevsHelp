// Requires User Schema
const Users = require('../models/user-model');
// Uses bcrypt for encryption
const bcrypt = require('bcrypt');


// User Registration
const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const usernameCheck = await Users.findOne({ username });

        // Makes sure that username is not already used
        if (usernameCheck) {
            return res.json({ msg: "Username is taken", status: false})
        }

        // Encrypts password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creates user
        const user  = await Users.create({
            username,
            password: hashedPassword,
        });

        // Deletes encrypted password after password is used
        delete user.password;

        // Returns results
        return res.json({ status: true, user });

    } catch (error) {
        next(error);
    }
}

// User login
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({ username });

        // If username is incorrect, warning is displayed
        if (!user) {
            return res.json({ msg: "Incorrect Username", status: false })
        }

        // Validates password
        const passwordValid = await bcrypt.compare(password, user.password);

        // If password is incorrect, warning is displayed
        if (!passwordValid) {
            return res.json({ msg: "Incorrect Password", status: false });
        }

        // Delets encrypted password after password is used
        delete user.password;

        // Returns results
        return res.json({ status: true, user });

    } catch(error) {
        next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {

        // Finds all users except user that is logged in, and only grabs ID and username
        const users = await Users.find({ _id: { $ne: req.params.id } }).select([
            '_id',
            'username',
        ]);

        // Returns results
        return res.json(users);
    } catch (error) {
        next(error);
    }
}

// Exports controllers
module.exports = { register, login, getUsers };