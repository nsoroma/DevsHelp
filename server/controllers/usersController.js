const Users = require('../models/user-model');
const bcrypt = require('bcrypt');


const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const usernameCheck = await Users.findOne({ username });

        if (usernameCheck) {
            alert("Username already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            username,
            password: hashedPassword,
        });

        delete user.password;
        return res.json({ status: true, user });

    } catch (error) {
        next(error);
    }
}

module.exports = register;