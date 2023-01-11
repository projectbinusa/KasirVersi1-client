import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Hero from "./pages/Hero";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={<Navigate to="/Home" />}
        />
        <Route
          exact path="/"
          element={
            <PrivateRoute>
              <Home />
           </PrivateRoute>
          }
        >          
        <Route
          path="Home"
          element={<Hero />}
        />
        <Route
          path="Dashboard"
          element={<Dashboard />}
        />
        </Route>
        <Route path="/*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
