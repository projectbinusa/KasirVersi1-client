import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            // <PrivateRoute>
              <Home />
            // </PrivateRoute>
          }
        />
        <Route path="/*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
