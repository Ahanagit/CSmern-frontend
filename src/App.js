import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Employee from "./components/Employee";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import AllEmployee from "./components/AllEmployee";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/myemployee" element={<AllEmployee />} />
      </Routes>
    </>
  );
};

export default App;
