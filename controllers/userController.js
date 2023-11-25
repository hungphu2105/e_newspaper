const User = require('../models/User')

//GET /admin
exports.getAccounts = (async (req, res, next) => {
    try {
        const users = await User.find({role:1});
        res.status(200).json({
            success: true,
            users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})

//POST /users/admin/:id
exports.disabled = (async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        is_active = !user.is_active
        user_update = await User.updateOne(
            { _id: req.params.id},
            { $set: { is_active: is_active } },
            { new: true },)
        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
})
