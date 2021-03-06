import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import cors from "cors";

import connectDB from "./src/db/connect.js";
import indexRouter from './src/routes/index.js'

app.use(express.json());

app.use(cors());
app.use(indexRouter)

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
