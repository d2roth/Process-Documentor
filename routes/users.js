const router = require('express').Router();

const UsersController = require('../controllers/usersController');

router.get('/new', UsersController.new);
router.post('/', UsersController.create);

module.exports = router;