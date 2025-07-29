import mongoose from "mongoose";

export const dbconnection = async () => {
  mongoose.connect(process.env.MONGO_URI, {
    dbName: "restaurantReservation"
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
  });
};