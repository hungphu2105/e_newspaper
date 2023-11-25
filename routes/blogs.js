const express = require('express');
const router = express.Router();

const {
    getAll,
    getBlog,
    create,
    update,
    adminDestroy,
} = require('../controllers/blogController.js');

const {
    verifyToken,
    isUser,
    isAdmin,
    isAdminOrUser
} = require('../middlewares/authMiddleware.js');

router.get('/:id', verifyToken, isAdminOrUser, getBlog);
router.post('/create', verifyToken, isUser, create);
router.put('/:id', verifyToken, isUser, update);

router.delete('/admin/:id', verifyToken, isAdmin, adminDestroy);

router.get('/', verifyToken, isAdminOrUser, getAll);

module.exports = router;