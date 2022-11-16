const { default: mongoose } = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, error => {
        if (error) {
            console.log('Database connection failed' + error.message);
        }
    });

    await mongoose.connection.once('open', () => {
        console.log('Database connected successfully');
    });
}

module.exports = connectDB;

