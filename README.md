# MERN Task Manager

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Create, read, update, and delete tasks
- Task status management
- Responsive design for all device sizes
- Clean, intuitive user interface

## Technologies Used

### Frontend
- React
- TypeScript
- React Router
- Axios
- Tailwind CSS
- Lucide React (for icons)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

- Node.js
- MongoDB (running locally or MongoDB Atlas account)

### Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Set up environment variables in `.env` file
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-manager
   ```

### Running the Application

Start the backend server:
```
npm run server
```

Start the frontend development server:
```
npm run dev
```

Run both frontend and backend concurrently:
```
npm run dev:full
```

## Project Structure

```
├── server/                  # Backend code
│   ├── controllers/         # API controllers
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   └── index.js             # Server entry point
├── src/                     # Frontend code
│   ├── components/          # React components
│   ├── pages/               # Page components
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main App component
│   └── main.tsx             # App entry point
├── .env                     # Environment variables
└── package.json             # Project dependencies and scripts
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task