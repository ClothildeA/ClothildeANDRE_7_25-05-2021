const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comments');

router.post('/create', auth, commentCtrl.create);
router.get('/getAll', auth, commentCtrl.findAll);
router.delete('/:id', auth, commentCtrl.delete);

module.exports = router;