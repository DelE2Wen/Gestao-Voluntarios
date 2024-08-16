const router = require('express').Router();
const verifyToken = require('../helpers/verify-token');
const SideBarUsers = require('../controllers/SideBarUsersController')

router.get('/', verifyToken, SideBarUsers.pickUsers);

module.exports = router;