const router = require('express').Router();
const MessageController = require('../controllers/MessageController');

//verificar se o usuário está logado
const verifyToken = require('../helpers/verify-token');

router.get('/:id', verifyToken,  MessageController.getMessages);
router.post('/send/:id', verifyToken,  MessageController.sendMessage);

module.exports = router;