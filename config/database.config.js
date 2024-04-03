require('dotenv').config();
const mongoose = require('mongoose');

const ConnectToDataBase = async () => {
    console.log("Trying To connect DB...");
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        const DB_Info = {
            status: "Connected to the Database..",
            host: mongoose.connection.host,
            DB: mongoose.connection.name,
            Time: new Date(),
        };
        console.table(DB_Info);
        console.log("MongoDB Connection Successfull..");
    } catch (error) {
        console.error(`Error connection to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process on connection failure
    };
};


module.exports = { ConnectToDataBase };