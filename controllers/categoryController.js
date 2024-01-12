const Category = require('../models/Category')

//GET /categories
exports.getAll = (async (req, res) => {
    try {
        const categories = await Category.find();
        //console.log(blogs);
        res.status(201).json({
            success: true,
            categories
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
        const category = await Category.create({ ...req.body});
        res.status(201).json({
            success: true,
            message: 'Tạo danh mục thành công.',
            category
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message || error
        });
    }
})

// //PUT /blogs/:id
// exports.update = (async (req, res) => {
//     try {
//         const blogData = req.body;
//         //console.log(req.body)
//         const blog = await Blog.findOne({ _id: req.params.id})
//         if(req.body.image){
//             //console.log("image")
//             const publicId = blog.image.publicId;
//             if (publicId) {
//                 await cloudinary.uploader.destroy(publicId);
//             }
//             const result = await cloudinary.uploader.upload(req.body.image);
//             blogData.image = {
//                 publicId: result.public_id,
//                 url: result.secure_url
//             }
//         }
//         await blog.updateOne(blogData)

//         //const blog = await Blog.updateOne({ _id: req.params.id}, req.body);
//         res.status(201).json({
//             success: true,
//             message: 'Cập nhật bài viết thành công.',
//             blog
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: err.message 
//         });
//     }
// })

// //DELETE /blogs/admin/:id
// exports.adminDestroy = (async (req, res) => {
//     try {
//         await Blog.deleteOne({ _id: req.params.id});
//         res.status(201).json({
//             success: true,
//             message: 'Xóa bài viết thành công.',
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: err.message 
//         });
//     }

// })