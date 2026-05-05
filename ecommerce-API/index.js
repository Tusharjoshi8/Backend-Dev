import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import authMiddleware from "./middleware/authentication.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(authMiddleware);
app.use("/api/users", userRoute);
mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    console.log("Connected to MongoDB");
}   
).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}); 