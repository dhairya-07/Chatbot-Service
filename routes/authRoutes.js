const { Router } = require('express');
const { createUser, login } = require('../controllers/auth');

const router = Router();

router.route('/signup').post(createUser);
// router.route('/login').post(login);

module.exports = router;
