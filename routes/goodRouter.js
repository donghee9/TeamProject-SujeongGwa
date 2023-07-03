//routes/goodRouter.js

const express = require('express');
const {goodController} = require('../controllers');

const router = express.Router();
router.get(`/category/:goodId`, goodController.getGoodController);
router.get('/name/:goodName', goodController.getGoodsNumController);
module.exports = router
