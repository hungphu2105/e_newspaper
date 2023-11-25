const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const bcrypt = require('bcrypt');

const { 
    generateToken, 
    generateRefreshToken, 
    generateChildrenRefreshToken, 
    deleteABranch
} = require('../utils/tokenUtils.js');

const {
    setCookiesAndResponse,
    clearCookies
} = require('../utils/cookiesUtils.js');

exports.loginUser = (async (req, res) => {
    const { phone_number, pass_word } = req.body;
    if (!phone_number || !pass_word) {
        return res.status(400).json({ success: false, message: 'Số điện thoại và mật khẩu không thể trống.' });
    }

    const user = await User.findOne({ phone_number }); 
    if (!user) {
        return res.status(401).json({ success: false, message: 'Số điện thoại không chính xác!' });
    }

    const isMatch = await bcrypt.compare(pass_word, user.pass_word);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Mật khẩu không chính xác!' });
    }
    const token = await generateRefreshToken(user._id);
    setCookiesAndResponse(res, token, user);
})

exports.registerUser = (async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pass_word, 10);
        const newUser = {
            phone_number: req.body.phone_number,
            pass_word: hashedPassword,
            user_name: req.body.user_name,
            birth_day : req.body.birth_day,
            gender: req.body.gender,
            email: req.body.email,
        };
        const user = await User.create(newUser);
        res.status(201).json({
            success: true,
            message: 'Đăng ký thành công.',
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})

exports.logout = (async (req, res) => {
    const token = req.cookies.refreshToken;
    const refreshToken = await RefreshToken.findOne({ token });
    if (refreshToken) {
        const parentId = refreshToken.parent || refreshToken._id;
        await deleteABranch(parentId);
    }
    clearCookies(res, true, 'Đăng xuất thành công.');
})