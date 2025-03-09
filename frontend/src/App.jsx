import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./context/Notes/NoteState";
import AuthState from "./context/Auth/AuthState";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <AuthState>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </AuthState>
  );
}