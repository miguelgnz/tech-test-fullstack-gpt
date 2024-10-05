const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const app = express();

const tasksDB = [
  {
    id: "abc2213-213sd-1dass4-43242334",
    title: "Learn Node.js",
    completed: false,
  },
  {
    id: "abc2213-213sd-1dass4-43242335",
    title: "Learn React",
    completed: false,
  },
  {
    id: "abc2213-213sd-1dass4-43242336",
    title: "Learn Express",
    completed: false,
  },
];

app.use(cors());

app.use(express.json());

// GET route that will return all tasks
app.get("/tasks", (req, res) => {
  res.json(tasksDB);
});

// POST route that will create a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  // Check if the title is empty
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: crypto.randomUUID(),
    title: title,
    completed: false,
  };

  tasksDB.push(newTask);

  res.json({
    message: "Task created successfully",
    task: newTask,
  });
});

//PATCH route that will complete a task
app.patch("/tasks/:id", (req, res) => {
  const id = req.params.id;

  const taskToComplete = tasksDB.find((task) => task.id === id);

  if (!taskToComplete) {
    return res.status(404).json({ error: "Task not found" });
  }

  taskToComplete.completed = true;

  res.json({
    message: "Task completed successfully",
    task: taskToComplete,
  });
});

//DELETE route that will delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;

  const taskToDelete = tasksDB.find((task) => {
    return task.id === id.toString();
  });

  if (!taskToDelete) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasksDB.splice(tasksDB.indexOf(taskToDelete), 1);

  res.json({
    message: "Task deleted successfully",
    task: taskToDelete,
  });
});

const desiredPort = process.env.PORT || 3000;

app.listen(desiredPort, () => {
  console.log(`Server running on localhost:${desiredPort}`);
});
