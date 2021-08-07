const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/users', auth, userCtrl.findAll);
router.get('/user/:id', auth, userCtrl.findOne);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;