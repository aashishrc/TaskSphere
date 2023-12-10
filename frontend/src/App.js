import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useEffect, useState } from "react";
import Column from "./components/Column";
import KanbanBoard from "./components/KanbanBoard";
import Task from "./components/Task";
import CreateTask from "./components/CreateTask"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="kanbanBoard" element={<KanbanBoard />} />
            <Route path="newTask" element={<CreateTask/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
