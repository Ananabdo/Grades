import { Request, Response } from "express";
import GradeModel from "../models/GradeModel";

const toSummaryMap = (
  rows: Array<{ _id: string | number; [key: string]: any }>,
  valueKey: string,
) =>
  Object.fromEntries(
    rows.map((row) => [String(row._id), Number(row[valueKey])]),
  );

// POST /grades
export const createGrade = async (req: Request, res: Response) => {
  try {
    const grade = await GradeModel.create(req.body);
    res.status(201).json(grade);
  } catch (error) {
    res.status(400).json({ message: "Error creating grade", error });
  }
};

// GET /grades
export const getGrades = async (req: Request, res: Response) => {
  try {
    const grades = await GradeModel.find();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: "Error fetching grades", error });
  }
};

// משימה 1 – GET /grades/average
export const getAverageScore = async (req: Request, res: Response) => {
  try {
    const result = await GradeModel.aggregate([
      { $group: { _id: null, averageScore: { $avg: "$score" } } },
    ]);
    res.json(result[0]?.averageScore ?? 0);
  } catch (error) {
    res.status(500).json({ message: "Error calculating average", error });
  }
};

// משימה 2 – GET /grades/average-by-class
export const getAverageByClass = async (req: Request, res: Response) => {
  try {
    const result = await GradeModel.aggregate([
      {
        $group: {
          _id: "$className",
          averageScore: { $avg: "$score" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(toSummaryMap(result, "averageScore"));
  } catch (error) {
    res.status(500).json({ message: "Error calculating average by class", error });
  }
};

// משימה 3 – GET /grades/passed
export const getPassedGrades = async (req: Request, res: Response) => {
  try {
    const result = await GradeModel.aggregate([
      { $match: { score: { $gte: 60 } } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);
    res.json(result[0]?.count ?? 0);
  } catch (error) {
    res.status(500).json({ message: "Error fetching passed grades", error });
  }
};

// משימה 4 – GET /grades/top-subjects
export const getTopSubjects = async (req: Request, res: Response) => {
  try {
    const result = await GradeModel.aggregate([
      { $group: { _id: "$subject", averageScore: { $avg: "$score" } } },
      { $sort: { averageScore: -1 } },
    ]);
    res.json(toSummaryMap(result, "averageScore"));
  } catch (error) {
    res.status(500).json({ message: "Error fetching top subjects", error });
  }
};

// בונוס 1 – GET /grades/failed-by-class
export const getFailedByClass = async (req: Request, res: Response) => {
  try {
    const result = await GradeModel.aggregate([
      { $match: { score: { $lt: 60 } } },
      { $group: { _id: "$className", failedCount: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json(toSummaryMap(result, "failedCount"));
  } catch (error) {
    res.status(500).json({ message: "Error fetching failed by class", error });
  }
};

// בונוס 2 – GET /grades/max-by-subject
export const getMaxBySubject = async (req: Request, res: Response) => {
  try {
    const result = await GradeModel.aggregate([
      { $group: { _id: "$subject", maxScore: { $max: "$score" } } },
    ]);
    res.json(toSummaryMap(result, "maxScore"));
  } catch (error) {
    res.status(500).json({ message: "Error fetching max by subject", error });
  }
};
