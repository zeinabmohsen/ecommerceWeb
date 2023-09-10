const Router = require('express')
const router = new Router()
const {AddToCart,getUserCart} = require('../controllers/cartController')
const {protect} = require('../controllers/authController')

router.post('/', protect, AddToCart);
router.get('/:id',protect,getUserCart)


module.exports = router;