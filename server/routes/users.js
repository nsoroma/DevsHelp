const { register, login, getUsers }= require('../controllers/usersController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/getusers', getUsers);

module.exports = router;