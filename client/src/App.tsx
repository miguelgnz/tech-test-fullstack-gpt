import { useEffect, useState } from "react";
import "./App.css";

import { createTask, deleteTask, completeTask } from "./api/tasks";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  //get all tasks from server
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await fetch("http://localhost:3000/tasks").then((res) => {
        //Validate firts if the response is ok
        if (!res.ok) {
          throw new Error("Error fetching tasks");
        }

        return res.json();
      });

      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    //Hit the server to create a new task
    e.preventDefault();

    const newTask = {
      title: userInput,
    } as Task;

    const taskCreated = await createTask(newTask);
    setTasks([...tasks, taskCreated]);
    setUserInput("");
  };

  return (
    <div>
      <h1>Tasks Manager</h1>
      <div className="mainWrapper">
        <form onSubmit={onSubmitForm}>
          <label htmlFor="task">
            Task
            <input
              name="task"
              type="text"
              placeholder="Task"
              required
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
            />
          </label>
          <button type="submit">Add Task</button>
        </form>
        <section>
          <h2>Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            <ul>
              {tasks.map((task) => {
                return (
                  <li key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{`${task.completed ? "Completed" : "Incomplete"}`}</p>
                    <button
                      onClick={async () => {
                        await completeTask(task.id);
                        //Update tasks state
                        const newTasks = tasks.map((t) => {
                          if (t.id === task.id) {
                            return { ...t, completed: true };
                          }

                          return t;
                        });
                        setTasks(newTasks);
                      }}
                    >
                      Complete
                    </button>
                    <button
                      onClick={async () => {
                        await deleteTask(task.id);
                        const newTasks = tasks.filter((t) => t.id !== task.id);
                        setTasks(newTasks);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
