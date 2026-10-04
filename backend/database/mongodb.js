import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";


if (!DB_URI) {
    throw new Error("Define DB_URI in .env.development.local");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI, {
            serverSelectionTimeoutMS: 10000,
        });
    } catch (error) {
        console.error("failed connecting to database");
        console.error(error.message);
        process.exit(1);
    }
};

export default connectToDatabase;
