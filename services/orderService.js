const orderDao = require('../models/orderDao');

const createOrder = async (userId, address) => {
  try {
    const carts = await orderDao.getCarts(userId);
    if (carts.length === 0) {
      const error = new Error('Cart is empty');
      error.statusCode = 400;
      throw error;
    }
    
    const {userPoint, totalPrice} = await orderDao.calculatePrice(userId, carts);
    if (userPoint < totalPrice) {
      const error = new Error('Not enough points to complete this purchase');
      error.statusCode = 400;
      throw error;
    }

    const postOrder = await orderDao.createOrder(userId, address, carts);

    return postOrder;
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    throw error;
  }
};

module.exports = {
  createOrder,
};