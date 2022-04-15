// Grabs controllers
const { register, login, getUsers }= require('../controllers/usersController');

// Sets up router
const router = require('express').Router();

// Creates routes for users
router.post('/register', register);
router.post('/login', login);
router.get('/getusers/:id', getUsers);

// Exports router
module.exports = router;