const router = require('express').Router();
const UserController = require('../controllers/UserController');

//middleware e helpers
const verifyToken = require('../helpers/verify-token');
const {imageUpload} = require('../helpers/image-uploader')

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/checkUser', UserController.checkUser);
router.get('/:id', UserController.getUserById);
router.post('/deletar', UserController.deleteUser);
router.patch('/edit/:id', imageUpload.single("image"), verifyToken, UserController.editUser);

module.exports = router;