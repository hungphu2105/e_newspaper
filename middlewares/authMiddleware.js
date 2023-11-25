const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const verifyToken = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            message: 'Không đủ quyền truy cập.' 
        });
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Không đủ quyền truy cập.' 
            });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id).select('-pass_word');
        if (!user.is_active) {
            return res.status(401).json({ 
                success: false, 
                message: 'Tài khoản đã bị khóa' 
            });
        }
        req.user = user;
        // next();
    } catch (err) {
        res.status(401).json({ 
            success: false, 
            message: err.message 
        });
    }
    next();
}

const isUser = (req, res, next) => {
    if (!req.user || req.user.role !== 1) {
        return res.status(401).json({ 
            success: false, 
            message: 'Chưa đăng nhập' 
        });
    }
    next();
};

const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 0) {
        return res.status(401).json({ 
            success: false, 
            message: 'Không đủ quyền truy cập.' 
        });
    }
    next();
};

const isAdminOrUser = (req, res, next) => {
    if (!req.user || (req.user.role !== 0 && req.user.role !== 1)) {
        return res.status(401).json({ 
            success: false, 
            message: 'Không đủ quyền truy cập.' 
        });
    }
    next();
};

module.exports = {
    verifyToken,
    isUser,
    isAdmin,
    isAdminOrUser
}