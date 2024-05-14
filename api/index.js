import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected DB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen("3000", () => {
  console.log("Server running at port 3000");
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);