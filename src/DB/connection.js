import mongoose from "mongoose";
import { DB_URI } from "../../Config/config.service.js";
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
export default connectDB;