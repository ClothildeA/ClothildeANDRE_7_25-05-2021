const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

/*
const multer = require('../middleware/multer_config');
*/

router.get('/users', auth, userCtrl.findAll);
router.get('/user/:id', auth, userCtrl.findOne);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/user/:id', userCtrl.delete);

module.exports = router;