import { MongoClient } from "mongodb";

const MONGO_URI = "mongodb://localhost:27017/contact-server";

export const client = new MongoClient(MONGO_URI);
export const db = client.db();
