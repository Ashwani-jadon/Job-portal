import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("mongodb is connected");
  } catch (error) {
    console.error(error);
  }
};
export default connectdb;
