const { Router } = require('express');
const { createCategory, getAllCategory } = require('../controllers/categoryController');
const router = Router();

router.post('/', createCategory);
router.get('/', getAllCategory);

module.exports = router;
