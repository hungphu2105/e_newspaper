const {generateToken} = require('./tokenUtils.js');

const setCookiesAndResponse = (res, token, user) => {
    res.cookie('refreshToken', token.token, {
        httpOnly: true,
        expires: token.expires,
        path: '/auth'
    });
    res.json({
        success: true,
        data: {
            id: user._id,
            username: user.user_name,
            role: user.role,
            avatar: user.avatar.url,
            token: generateToken(user._id)
        }
    });
};

const clearCookies = (res, success, message) => {
    res.clearCookie('refreshToken', { path: '/auth' });
    res.status(200).json({ success: success, message: message });
}

module.exports = {
    setCookiesAndResponse,
    clearCookies} ;