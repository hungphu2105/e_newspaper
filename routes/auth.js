const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logout,
} = require('../controllers/authController.js');

const {
    verifyToken,
    isAdminOrUser
} = require('../middlewares/authMiddleware.js');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/logout', logout);

module.exports = router;