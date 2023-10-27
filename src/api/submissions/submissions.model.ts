import { WithId } from "mongodb";
import * as z from "zod";

import { db } from "../../db/db";

export const Submission = z
  .object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    message: z.string().trim().min(5),
  })
  .strict();

export type Submission = z.infer<typeof Submission>;
export type SubmissionWithId = WithId<Submission>;
export const Todos = db.collection<Submission>("submissions");
