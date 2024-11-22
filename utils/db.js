const mongoose = require('mongoose');

//const URI = "mongodb://127.0.0.1:27017/mongo_admin";
const URI =process.env.MONGODB_URI

const connectDb = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connection successful to database');
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit with failure code
    }
};

module.exports = connectDb;
