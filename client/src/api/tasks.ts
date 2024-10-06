import { Task } from "../App";

export const createTask = async (
  task: Task,
  onSuccess?: (task: Task) => void,
  //eslint-disable-next-line
  onFail?: (error: any) => void
) => {
  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Error creating task");
    }

    const data = await response.json();
    //Call the onSuccess callback if it was provided
    if (onSuccess) {
      onSuccess(data.task);
    }

  } catch (error) {
    if (onFail) {
      onFail(error);
    }
  }
};

export const deleteTask = async (
  id: string,
  onSuccess: (task: Task) => void,
  onFail: (error: Error | unknown) => void
) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error deleting task");
    }

    const data = await response.json();

    onSuccess(data.task);

    // return data.task;
  } catch (error) {
    //Should enter onFail callback
    onFail(error);
  }
};

export const completeTask = async (id: string) => {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PATCH",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error completing task");
    }

    return response.json();
  });

  return response.task;
};
