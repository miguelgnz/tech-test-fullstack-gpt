import { Router } from "express";
import crypto from "crypto";
import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster-sandbox.ar8pa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Sandbox`;

const client = new MongoClient(mongoUri);

const dbCollection = client.db("task_manager").collection("tasks");

export const TasksRouter = Router();

TasksRouter.get("/", async (req, res) => {
  const dbTasks = await dbCollection.find().toArray();

  res.json(dbTasks);
});

TasksRouter.post("/", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: crypto.randomUUID(),
    title: title,
    completed: false,
  };

  dbCollection.insertOne(newTask);

  res.json({
    message: "Task created successfully",
    task: newTask,
  });
});

TasksRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const dbTasks = await dbCollection.find().toArray();

  const task = dbTasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Change completed state to the opposite in the database
  dbCollection.updateOne({ id: id }, { $set: { completed: !task.completed } });

  res.json({
    message: "Task updated successfully",
    task,
  });
});

TasksRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const dbTasks = await dbCollection.find().toArray();

  const taskToDelete = dbTasks.find((task) => {
    return task.id === id.toString();
  });

  if (!taskToDelete) {
    return res.status(404).json({ error: "Task not found" });
  }

  //   tasksDB.splice(tasksDB.indexOf(taskToDelete), 1);

  dbCollection.deleteOne({ id: id });

  res.json({
    message: "Task deleted successfully",
    task: taskToDelete,
  });
});
