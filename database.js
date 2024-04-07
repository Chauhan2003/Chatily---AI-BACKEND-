import mongoose, { mongo } from "mongoose";

const mongoDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log(`Database is connected`);
    } catch (err) {
        console.log("Error in connection database", err.message);
    }
}

export default mongoDB;