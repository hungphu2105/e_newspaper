const jwt = require('jsonwebtoken');
const {nanoid} = require('nanoid');

const RefreshToken = require('../models/RefreshToken')


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '1d'
    });
};

const generateRefreshToken = async (user) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    return await RefreshToken.create({ token: nanoid(), expires, user });
};

const generateChildrenRefreshToken = async (user, parent) => {
    const tokenObj = { _: nanoid(10), p: parent };
    const token = Buffer.from(JSON.stringify(tokenObj)).toString('base64url');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    await RefreshToken.deleteMany({ parent });
    return await RefreshToken.create({ token, expires, user, parent });
};

const deleteABranch = async (parent) => {
    await RefreshToken.deleteMany({ parent });
    await RefreshToken.findByIdAndDelete(parent);
}

module.exports = { 
    generateToken, 
    generateRefreshToken, 
    generateChildrenRefreshToken, 
    deleteABranch,}
