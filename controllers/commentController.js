const Comment = require('../models/Comment')

//Blog /comments/create/:id
exports.create = (async (req, res) => {
    try {
        const currentDate = new Date();
        const comment = await Comment.create({ user_id:req.user._id, blog_id:req.params.id , ...req.body, create_comment_time: currentDate});
        res.status(201).json({
            success: true,
            message: 'Comment thành công.',
            comment
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message || error
        });
    }
})