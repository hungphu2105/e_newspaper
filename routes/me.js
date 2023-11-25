const express = require('express');
const router = express.Router();

const {
    getMyBlogs,
    getInfo,
    updateInfo,
    updatePassword,
    destroy
} = require('../controllers/meController.js');

const {
    verifyToken,
    isUser,
    isAdminOrUser,
} = require('../middlewares/authMiddleware.js');

router.get('/myblogs', verifyToken, isUser, getMyBlogs);
router.get('/account/info', verifyToken, isAdminOrUser, getInfo);
router.put('/account/info', verifyToken, isAdminOrUser, updateInfo);
router.put('/account/password', verifyToken, isUser, updatePassword);
router.delete('/myblogs/:id', verifyToken, isUser, destroy);


module.exports = router;