# Problem: Task Management Application
Objective:

Create a simple Task Management Application with a front-end built using ReactJS and TypeScript, and a back-end using NodeJS and ExpressJS. The application should allow users to:

- Create a task
- View all tasks
- Mark a task as completed
- Delete a task


## Requirements:

1. Backend (NodeJS + ExpressJS):

- Create an Express server that handles the following endpoints:
[x] POST /tasks: Create a new task (the task should have a title and a completed status, which is false by default).
[x] GET /tasks: Retrieve all tasks.
[x] PATCH /tasks/:id: Mark a task as completed.
[x] DELETE /tasks/:id: Delete a task by its ID.
[x] Use an in-memory data structure (like an array) to store tasks for this exercise (no need for a database).
[x] Use TypeScript for typing in your Express application.


2. Frontend (ReactJS + TypeScript):

- Create a simple UI that allows the user to:
[x] Input a task title and create a task.
[x] View a list of tasks (including both completed and incomplete tasks).
[x] Mark a task as completed (this should update the UI without refreshing the page).
[x] Delete a task.
[x] Use Fetch or Axios to interact with the back-end API.
[x] Style the app minimally (CSS or CSS modules is fine).

## Extra (Optional):

- Implement basic form validation on the front-end (e.g., prevent empty task submissions).
- Add loading indicators while fetching or modifying data.

## Deliverables:

- A working application where users can manage tasks.
- Both the front-end and back-end code (preferably hosted on a platform like GitHub).
- Clear instructions on how to run both the client and server locally.
