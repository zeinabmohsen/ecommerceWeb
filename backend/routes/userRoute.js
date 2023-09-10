const {Router} = require('express');
const controller = require('../controllers/userController');
const { checkUserValidator } = require('../validator/userValidator');
const router = Router();

router.get('/' , controller.getUser)
router.get('/:id', controller.getUserById)
router.post('/',checkUserValidator,controller.addUser)
router.delete('/:id',controller.deleteUser)
router.put('/:id',controller.updateUser)
module.exports = router;