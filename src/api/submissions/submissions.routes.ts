import express from "express";

import * as submissionHandlers from "./submissions.handlers";

import { validateSubmmission, rateLimiter, frequencyLimiter } from "../../middlewares";

const submissionsRouter = express.Router();

submissionsRouter.get("/", submissionHandlers.findAllSubmissions);
submissionsRouter.post("/", frequencyLimiter, rateLimiter, validateSubmmission, submissionHandlers.postSubmission);

export default submissionsRouter;
