import express from "express";

import MessageResponse from "../interfaces/MessageResponse";

import submissionsRouter from "./submissions/submissions.routes";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "Server for submissions on https://dgdev.vercel.app Go Home",
  });
});

router.use("/submissions", submissionsRouter);

export default router;
