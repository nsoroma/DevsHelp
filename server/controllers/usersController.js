const Users = require('../models/user-model');
const bcrypt = require('bcrypt');


const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const usernameCheck = await Users.findOne({ username });

        if (usernameCheck) {
            return res.json({ msg: "Username is taken", status: false})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user  = await Users.create({
            username,
            password: hashedPassword,
        });

        delete user.password;

        return res.json({ status: true, user });

    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({ username });

        if (!user) {
            return res.json({ msg: "Incorrect Username", status: false })
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            return res.json({ msg: "Incorrect Password", status: false });
        }

        delete user.password;

        return res.json({ status: true, user });

    } catch(error) {
        next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const userlist = await Users.find({ _id: { $ne: req.params.id } }).select([
            '_id',
            'username'
        ])
        return res.json(userlist);
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login, getUsers };