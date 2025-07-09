import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables.");
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.error("Error in DB connection:", err);
  });

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

export default mongoose;
