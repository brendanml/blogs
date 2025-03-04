import helper from "./test_helper.js"; // Ensure correct file extension (.js)
import connectDB from "./db.js";
import mongoose from "mongoose";

connectDB();

try {
    await helper.deleteAndCreateSampleData();
} catch (error) {
    console.error("Error:", error);
} finally {
    mongoose.connection.close();
}
