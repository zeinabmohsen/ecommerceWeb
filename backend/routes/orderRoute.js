const Router =require('express');
const router = Router();
const {placeOrder} = require('../controllers/orderController');
const { protect } = require('../controllers/authController');

router.post('/',protect,placeOrder)
module.exports = router 