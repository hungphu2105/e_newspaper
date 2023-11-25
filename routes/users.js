const express = require('express');
const router = express.Router();

const {
    getAccounts,
    disabled ,
} = require('../controllers/userController.js');

const {
    verifyToken,
    isAdmin,
} = require('../middlewares/authMiddleware.js');

router.get('/admin', verifyToken, isAdmin, getAccounts);
router.post('/admin/:id', verifyToken, isAdmin, disabled);

module.exports = router;