const mongoose = require('mongoose');

const connectDatabase = () => {
    try {
        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect successfully')
    } catch (error) {
        console.log('connect failure')
    }
}

module.exports = connectDatabase