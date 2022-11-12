const mongoose = require('mongoose');

const databaseconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connnected successfully ....");
    } catch (error) {
        console.log(error);
    }
}

module.exports = databaseconnection;


