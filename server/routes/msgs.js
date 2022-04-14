const { getMsgs, addMsg } = require('../controllers/msgController');
const router = require('express').Router();

router.post('/sendmsg', addMsg);
router.post('/getmsg', getMsgs) 

module.exports = router