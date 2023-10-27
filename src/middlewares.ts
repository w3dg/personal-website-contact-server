import { NextFunction, Request, Response } from "express";

import ErrorResponse from "./interfaces/ErrorResponse";

import { Submission } from "./api/submissions/submissions.model";
import { ZodError } from "zod";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

export function validateSubmmission(req: Request, res: Response, next: NextFunction) {
  try {
    Submission.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422);
      res.json({
        errorMessage: "Invalid Body",
      });
    }
  }
}
