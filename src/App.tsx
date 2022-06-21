import React from "react";
import Navbar from "./components/AppBar";
import { TodoPage } from "./pages/TodoPage";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserList } from "./components/UserList";
import { TasksPage } from "./pages/TasksPage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar />
      <Routes>
        <Route path="/" element={"Home"} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </DndProvider>
  );
}

export default App;
