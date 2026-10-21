// Optional: loads the 10 grades from seed-grades.json in one go (instead of 10 POSTs in Postman)
import "dotenv/config";
import mongoose from "mongoose";
import GradeModel from "./models/GradeModel";
import grades from "../seed-grades.json";

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  await GradeModel.deleteMany({});
  await GradeModel.insertMany(grades);
  console.log(`Inserted ${grades.length} grades`);
  await mongoose.disconnect();
};

seed();
