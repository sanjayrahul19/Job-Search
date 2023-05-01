import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();


mongoose.set("strictQuery", true);
export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`DB connected ${db.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
