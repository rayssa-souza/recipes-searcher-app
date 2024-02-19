import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(json());

async function connectDataBase() {
  try {
    await mongoose.connect(process.env.DB_HOST as string);
  } catch (error) {
    console.log(error);
  }
}

connectDataBase();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
