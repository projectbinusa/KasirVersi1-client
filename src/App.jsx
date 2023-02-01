import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Hero from "./pages/Hero";
import NotFound from "./pages/NotFound";
import Libraryy from "./pages/Libraryy";
import Bils from "./pages/Bils";
import Setting from "./pages/Setting";

function App({iconList}) {
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
          element={<Hero iconList={iconList}/>}
        />
        <Route
          path="Dashboard"
          element={<Dashboard />}
        />
         <Route
          path="Library"
          element={<Libraryy iconList={iconList}/>}
        />
         <Route
          path="Bills"
          element={<Bils />}
        />
         <Route
          path="Setting"
          element={<Setting />}
        />
        </Route>
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
