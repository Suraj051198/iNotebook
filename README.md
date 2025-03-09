<<<<<<< HEAD
# iNotebook - MERN Stack Note Taking Application

iNotebook is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack that allows users to create, store, edit, and manage their notes securely in the cloud.

![iNotebook](https://via.placeholder.com/800x400?text=iNotebook+MERN+Application)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend Details](#frontend-details)
- [Backend Details](#backend-details)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Future Enhancements](#future-enhancements)

## Features

- **User Authentication**: Secure signup and login functionality
- **Create Notes**: Add new notes with title, description, and tags
- **View Notes**: Display all notes for the logged-in user
- **Edit Notes**: Update existing notes
- **Delete Notes**: Remove unwanted notes
- **Tag Organization**: Categorize notes with tags
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Protected Routes**: Secure access to user-specific content

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces
- **React Router**: For navigation and routing
- **Context API**: For state management
- **Bootstrap**: For responsive UI components
- **Vite**: For fast development and building

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: For password hashing
- **express-validator**: For input validation

### Development Tools
- **Nodemon**: For automatic server restarts during development
- **Concurrently**: To run multiple commands concurrently

## Project Structure

```
MyMERNProject/
├── backend/                 # Backend server code
│   ├── middleware/          # Express middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── .env                 # Environment variables
│   ├── db.js                # Database connection
│   ├── index.js             # Server entry point
│   └── package.json         # Backend dependencies
├── frontend/                # React frontend code
│   ├── public/              # Static files
│   ├── src/                 # Source files
│   │   ├── components/      # React components
│   │   ├── context/         # Context API files
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── index.html           # HTML template
│   └── package.json         # Frontend dependencies
├── package.json             # Root package.json for scripts
└── README.md                # Project documentation
```

## Frontend Details

The frontend is built with React and uses the Context API for state management. It follows a component-based architecture for better code organization and reusability.

### Key Components

- **App.jsx**: The main component that sets up routing and context providers
- **Navbar.jsx**: Navigation bar with conditional rendering based on authentication
- **Home.jsx**: Main page displaying notes for authenticated users
- **Login.jsx**: User login form
- **Signup.jsx**: User registration form
- **Notes.jsx**: Component to display all notes
- **NoteItem.jsx**: Individual note card with edit and delete functionality
- **Addnote.jsx**: Form to add new notes
- **About.jsx**: Information about the application
- **PrivateRoute.jsx**: Route protection for authenticated users

### Context API

- **AuthContext**: Manages authentication state and user information
- **NoteContext**: Manages notes state and CRUD operations

## Backend Details

The backend is built with Node.js and Express, providing a RESTful API for the frontend to consume. It uses MongoDB for data storage and JWT for authentication.

### Middleware

- **fetchUser.js**: Authenticates requests using JWT tokens

### Models

- **User.js**: Schema for user data (name, email, password)
- **Notes.js**: Schema for notes data (title, description, tag, user reference)

### Routes

- **auth.js**: Endpoints for user registration, login, and profile
- **notes.js**: Endpoints for CRUD operations on notes

## Database Schema

### User Collection
```
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  date: Date
}
```

### Notes Collection
```
{
  _id: ObjectId,
  user: ObjectId (reference to User),
  title: String,
  description: String,
  tag: String,
  date: Date
}
```

## API Endpoints

### Authentication Routes

- **POST /api/auth/createuser**: Register a new user
- **POST /api/auth/login**: Login a user
- **GET /api/auth/getuser**: Get logged-in user details (protected)

### Notes Routes

- **GET /api/notes/fetchallnotes**: Get all notes for a user (protected)
- **POST /api/notes/addnote**: Add a new note (protected)
- **PUT /api/notes/updatenote/:id**: Update an existing note (protected)
- **DELETE /api/notes/deletenote/:id**: Delete a note (protected)

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. When a user registers or logs in, the server generates a JWT token
2. This token is stored in localStorage on the client side
3. For protected routes, the token is sent in the request header
4. The server validates the token before processing the request
5. If the token is invalid or expired, the user is redirected to the login page

## Installation

1. Clone the repository
2. Install dependencies for the root project, backend, and frontend:

```bash
# Root directory
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Running the Application

```bash
# From the root directory
npm start
```

This will start both the backend server and the frontend development server concurrently.

- Backend runs on: http://localhost:5001
- Frontend runs on: http://localhost:5178 (or another port assigned by Vite)

## Environment Variables

### Backend (.env)
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/inotebook
JWT_SECRET=YourSecretKey
```

## Future Enhancements

- User profile management
- Note sharing functionality
- Rich text editor for notes
- Search and filter notes
- Dark mode
- Mobile application using React Native

---

Created by Suraj Sonawane | © 2023 iNotebook 
=======
# iNotebook
 MERN Stack Note Taking Application
>>>>>>> afd617c5c2c7df72f9a31777bf2aa78640250fb0
