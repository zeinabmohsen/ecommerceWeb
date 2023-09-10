const {Router}= require('express');
const {login,signUp} = require('../controllers/authController')
const router = Router();
router.post('/signup',signUp);
router.post('/login',login);

module.exports = router ;