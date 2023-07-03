const express = require('express');
const { userController } = require('../controllers');
const { loginRequired } = require('../utils/auth');
const router = express.Router();

router.post('/signup', userController.signUp);
router.get('/myOrderDetail', loginRequired, userController.orderDetail);
router.post('/signin', userController.signIn);

module.exports = router;
