const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

const postCtrl = require('../controllers/posts');

router.post('/create', auth, multer, postCtrl.create);
router.get('/getAll', auth, postCtrl.findAll);
router.get('/:id', auth, postCtrl.findOne);

module.exports = router;