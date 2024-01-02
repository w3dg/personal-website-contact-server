import { NextFunction, Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import { slowDown } from "express-slow-down";

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

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes).
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  validate: { xForwardedForHeader: false }, // ignore forwarded requests, from vpn/proxy for example
});

export const frequencyLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 2, // Allow 2 requests per 15 minutes.
  delayMs: (hits) => hits * 250, // Add 100 ms of delay
});

export function verifyAPIKey(req: Request, res: Response, next: NextFunction) {
  const api_key_header = req.get("X-API-KEY");

  if (api_key_header !== process.env.API_KEY) {
    res.status(401);
    const unAuthorizedError = new Error("UnAuthorized");
    next(unAuthorizedError);
  } else {
    next();
  }
}
