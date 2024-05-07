require('dotenv').config();
const Mongoose = require('mongoose');

const connectDB = async () => {
    await Mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('Database connected')}


module.exports = connectDB;