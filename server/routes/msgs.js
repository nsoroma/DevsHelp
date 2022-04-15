// Grabs controllers
const { getMsgs, addMsg } = require('../controllers/msgController');

// Sets up router
const router = require('express').Router();

// Creates routes for messages
router.post('/sendmsg', addMsg);
router.post('/getmsg', getMsgs) 

// Exports router
module.exports = router