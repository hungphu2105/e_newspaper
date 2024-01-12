const express = require('express');
const router = express.Router();

const {
    getAll,
    create,
    update,
    adminDestroy,
} = require('../controllers/categoryController.js');

const {
    verifyToken,
    isUser,
    isAdmin,
    isAdminOrUser
} = require('../middlewares/authMiddleware.js');

router.post('/create', verifyToken, isAdmin, create);
// router.put('/:id', verifyToken, isAdmin, update);

// router.delete('/admin/:id', verifyToken, isAdmin, adminDestroy);

router.get('/', verifyToken, isAdminOrUser, getAll);

module.exports = router;