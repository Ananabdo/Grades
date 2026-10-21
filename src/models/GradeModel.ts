import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  className: { type: String, required: true },
  subject: { type: String, required: true },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const GradeModel = mongoose.model("Grade", gradeSchema);

export default GradeModel;
