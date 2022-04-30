import React from "react";
import Navbar from "./components/AppBar";
// import { UserList } from "./components/UserList";
import { TodoPage } from "./pages/TodoPage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserList } from "./components/UserList";
import { TasksPage } from "./pages/TasksPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={"Home"} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </div>
  );
}

export default App;
