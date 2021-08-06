const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comments');

router.post('/create', auth, commentCtrl.create);
router.get('/getAll', auth, commentCtrl.findAll);
router.delete('/:id', auth, commentCtrl.delete);
router.put('/:id', auth, commentCtrl.update);

module.exports = router;