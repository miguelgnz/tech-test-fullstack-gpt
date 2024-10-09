import { useEffect, useState } from "react";
import "./App.css";
import Spinner from "./components/Spinner";

import { createTask, deleteTask, completeTask } from "./api/tasks";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  //get all tasks from server
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const tasks = await fetch("http://localhost:3000/tasks").then((res) => {
        //Validate firts if the response is ok
        if (!res.ok) {
          throw new Error("Error fetching tasks");
        }
        return res.json();
      });
      setTasks(tasks);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    //Hit the server to create a new task
    setLoading(true);
    e.preventDefault();

    const newTask = {
      title: userInput,
    } as Task;

    await createTask(
      newTask,
      (task) => {
        setTasks([...tasks, task]);
      },
      () => {
        console.log("Modal error message");
      }
    );

    setUserInput("");
    setLoading(false);
  };

  return (
    <div>
      <h1>Tasks Manager</h1>
      <div className="mainWrapper">
        <form onSubmit={onSubmitForm}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <label htmlFor="task">Task</label>
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
            <button type="submit">Add Task</button>
          </div>
        </form>
        <section>
          <h2>Tasks</h2>
          {loading ? (
            <Spinner />
          ) : tasks.length === 0 ? (
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
                        setLoading(true);
                        await deleteTask(
                          task.id,
                          (task) => {
                            const newTasks = tasks.filter(
                              (t) => t.id !== task.id
                            );
                            setTasks(newTasks);
                            setLoading(false);
                          },
                          (e) => {
                            console.log(
                              "Showing modal error message on delete operation"
                            );
                            console.log("Error returned: ", e);
                          }
                        );
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
