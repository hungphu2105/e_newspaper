const User = require('../models/User')
const Blog = require('../models/Blog')
const Comment = require('../models/Comment')
const RefreshToken = require('../models/RefreshToken')
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;

//GET /myposts
exports.getMyBlogs = (async (req, res) => {
    Blog.find({ user_id : req.user._id })
    .then(blogs => {
        res.status(200).json({
            success: true,
            blogs
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false, 
            message: err.message 
        });
    })
})

//GET /account/info
exports.getInfo = (async (req, res) => {
    try {
        const user = await User.findOne({ _id : req.user._id }).select('-pass_word');
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message, 
        });
    }
})

//PUT /account/info
exports.updateInfo = (async (req, res) => {
    try {
        const userData = req.body;
        //console.log(req.body)
        const user = await User.findById(req.user.id)
        if(req.body.avatar){
            //console.log("image")
            const publicId = user.avatar.publicId;
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
            const result = await cloudinary.uploader.upload(req.body.avatar);
            userData.avatar = {
                publicId: result.public_id,
                url: result.secure_url
            }
        }
        await user.updateOne(userData)

        //const blog = await Blog.updateOne({ _id: req.params.id}, req.body);
        res.status(201).json({
            success: true,
            message: 'Cập nhật thông tin thành công.',
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})

//PUT /account/password
exports.updatePassword = (async (req, res) => {
    const user = req.user;
    const { password, new_password, confirm } = req.body;
    const updateUser = await User.findById(user._id);
    const isMatch = await bcrypt.compare(password, updateUser.pass_word);
    if (!isMatch) {
        return res.status(400).json({ 
            success: false, 
            message: 'Mật khẩu không chính xác.' 
        });
    }

    if (new_password !== confirm) {
        return res.status(400).json({ 
            success: false, 
            message: 'Nhập lại mật khẩu không chính xác.' });
    }
    const hashedPassword = await bcrypt.hash(new_password, 10);
    await User.findByIdAndUpdate(updateUser._id, { pass_word: hashedPassword });
    await RefreshToken.deleteMany({ user: user._id });

    res.clearCookie('refreshToken', { path: 'auth' });
    res.status(200).json({ 
        success: true, 
        message: 'Đổi mât khẩu thành công.' 
    });
})

//DELETE /me/myposts/:id
exports.destroy = (async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.id, user_id:req.user._id})
        await cloudinary.uploader.destroy(blog.image.publicId);
        await Comment.deleteMany({ blog_id: req.params.id});
        await Blog.deleteOne({ _id: req.params.id, user_id:req.user._id});
        await 
        res.status(201).json({
            success: true,
            message: 'Xóa bài viết thành công.',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }

})