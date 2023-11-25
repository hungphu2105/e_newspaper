const express = require('express');
const router = express.Router();

const {
    create
} = require('../controllers/commentController.js');

const {
    verifyToken,
    isUser,
} = require('../middlewares/authMiddleware.js');

router.post('/create/:id', verifyToken, isUser, create);

module.exports = router;