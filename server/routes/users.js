const register = require('../controllers/usersController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', );

module.exports = router;