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
  - POST /tasks: Create a new task (the task should have a title and a completed status, which is false by default).
  - GET /tasks: Retrieve all tasks.
  - PATCH /tasks/:id: Mark a task as completed.
  - DELETE /tasks/:id: Delete a task by its ID.
  - Use an in-memory data structure (like an array) to store tasks for this exercise (no need for a database).
  - Use TypeScript for typing in your Express application.

2. Frontend (ReactJS + TypeScript):

- Create a simple UI that allows the user to:
  - Input a task title and create a task.
  - View a list of tasks (including both completed and incomplete tasks).
  - Mark a task as completed (this should update the UI without refreshing the page).
  - Delete a task.
  - Use Fetch or Axios to interact with the back-end API.
  - Style the app minimally (CSS or CSS modules is fine).

## Extra (Optional):

- Implement basic form validation on the front-end (e.g., prevent empty task submissions).
- Add loading indicators while fetching or modifying data.

## Deliverables:

- A working application where users can manage tasks.
- Both the front-end and back-end code (preferably hosted on a platform like GitHub).
- Clear instructions on how to run both the client and server locally.

# How to run the application

## How to run the application

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Running the Backend (Server)

1. Navigate to the backend directory:
    ```sh
    cd server
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm start
    ```

The server should now be running on `http://localhost:3000`.


### Running the Frontend (Client)

1. Open a new terminal and navigate to the frontend directory:
    ```sh
    cd client
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the React application:
    ```sh
    npm run dev
    ```

Check the terminal output for the URL where the client is running.

### Notes

- Ensure both the backend and frontend servers are running simultaneously for the application to function correctly.
- If you encounter any issues, check the terminal output for error messages and ensure all dependencies are installed correctly.
- For any additional configuration or environment variables, refer to the `.env.example` files in both the backend and frontend directories.