const Blog = require('../models/Blog')
const Comment = require('../models/Comment')
const cloudinary = require('cloudinary').v2;

//GET /blogs
exports.getAll = (async (req, res) => {
    try {
        const blogs = await Blog.find().populate('user_id', 'user_name');
        //console.log(blogs);
        res.status(201).json({
            success: true,
            blogs
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})

//GET /blogs/:id
exports.getBlog = (async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } }, 
            { new: true }
        ).populate('user_id', 'user_name');
        const comments = await Comment.find({ blog_id: req.params.id })
            .populate('user_id', 'user_name')
        //console.log(comments)
        // blog.comments = comments;
        // console.log(blog)
        res.status(201).json({
            success: true,
            blog,
            comments
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})

//Blog /blogs/create
exports.create = (async (req, res) => {
    try {
        const currentDate = new Date();

        //console.log(req.body)

        const result = await cloudinary.uploader.upload(req.body.image);
        const image = {
            publicId: result.public_id,
            url: result.secure_url
        }
        
        const blog = await Blog.create({ user_id:req.user._id ,...req.body, public_date: currentDate, image});
        res.status(201).json({
            success: true,
            message: 'Đăng bài thành công.',
            blog
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message || error
        });
    }
})

//PUT /blogs/:id
exports.update = (async (req, res) => {
    try {
        const blogData = req.body;
        //console.log(req.body)
        const blog = await Blog.findOne({ _id: req.params.id})
        if(req.body.image){
            //console.log("image")
            const publicId = blog.image.publicId;
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
            const result = await cloudinary.uploader.upload(req.body.image);
            blogData.image = {
                publicId: result.public_id,
                url: result.secure_url
            }
        }
        await blog.updateOne(blogData)

        //const blog = await Blog.updateOne({ _id: req.params.id}, req.body);
        res.status(201).json({
            success: true,
            message: 'Cập nhật bài viết thành công.',
            blog
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})

//DELETE /blogs/admin/:id
exports.adminDestroy = (async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.id});
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