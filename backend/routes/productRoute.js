const {Router} = require('express');
const {DeleteProducts,getAllProducts,createProduct,getAllProductsForCategory,getProductById,uploadImage}= require('../controllers/productController')
const router = Router();


router.post("/",uploadImage.single('image'),createProduct);
router.get("/",getAllProducts)
router.get("/:id",getProductById)
module.exports= router ;