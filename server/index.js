import express, { json } from "express";
import cors from "cors";
import { TasksRouter } from "./routes/tasks.js";
import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const envVar1 = process.env.MONGO_USER;
console.log("envVar1", envVar1);

const envVar2 = process.env.MONGO_PASSWORD;
console.log("envVar2", envVar2);

const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster-sandbox.ar8pa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Sandbox`;

const client = new MongoClient(mongoUri);

client
  .connect()
  .then((client) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("error", error);
  });

const app = express();

app.use(cors());

app.use(json());

app.use("/tasks", TasksRouter);

const desiredPort = process.env.PORT || 3000;

app.listen(desiredPort, () => {
  console.log(`Server running on localhost:${desiredPort}`);
});
