import { NextFunction, Request, Response } from "express";

import { Submission, SubmissionWithId, Todos } from "./submissions.model";

export async function findAllSubmissions(req: Request, res: Response<SubmissionWithId[]>, next: NextFunction) {
  try {
    const todos = await Todos.find().toArray();
    res.json(todos);
  } catch (error) {
    next(error);
  }
}

export async function postSubmission(req: Request<{}, {}, Submission>, res: Response<SubmissionWithId>, next: NextFunction) {
  try {
    const insertedTodo = await Todos.insertOne(req.body);
    if (!insertedTodo.acknowledged) {
      const insertError = new Error("Error inserting document");
      next(insertError);
    } else {
      const json = {
        ...req.body,
        _id: insertedTodo.insertedId,
      };
      res.json(json);
    }
  } catch (error) {
    next(error);
  }
}
