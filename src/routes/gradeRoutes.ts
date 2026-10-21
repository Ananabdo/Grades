import { Router } from "express";
import {
  createGrade,
  getGrades,
  getAverageScore,
  getAverageByClass,
  getPassedGrades,
  getTopSubjects,
  getFailedByClass,
  getMaxBySubject,
} from "../controllers/gradeController";

const router = Router();

router.post("/", createGrade);
router.get("/", getGrades);

router.get("/average", getAverageScore);
router.get("/average-by-class", getAverageByClass);
router.get("/passed", getPassedGrades);
router.get("/top-subjects", getTopSubjects);
router.get("/failed-by-class", getFailedByClass);
router.get("/max-by-subject", getMaxBySubject);

export default router;
