import express from "express";

import * as submissionHandlers from "./submissions.handlers";

import { validateSubmmission } from "../../middlewares";

const submissionsRouter = express.Router();

submissionsRouter.get("/", submissionHandlers.findAllSubmissions);
submissionsRouter.post("/", validateSubmmission, submissionHandlers.postSubmission);

export default submissionsRouter;
