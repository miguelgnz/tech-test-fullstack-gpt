import { Task } from "../App";

export const createTask = async (task: Task) => {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error creating task");
    }

    return response.json();
  });

  return response.task;
};

export const deleteTask = async (id: string) => {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
    }).then((response) => {
        if (!response.ok) {
        throw new Error("Error deleting task");
        }
    
        return response.json();
    });
    
    return response.task;
}

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
}
