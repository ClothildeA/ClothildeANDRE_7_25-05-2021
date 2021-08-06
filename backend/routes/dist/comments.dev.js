"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../middleware/auth');

var commentCtrl = require('../controllers/comments');

router.post('/create', auth, commentCtrl.create);
router.get('/getAll', auth, commentCtrl.findAll);
router["delete"]('/:id', auth, commentCtrl["delete"]);
router.put('/:id', auth, commentCtrl.update);
module.exports = router;