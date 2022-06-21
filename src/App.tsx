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
        <Route path="https://ranami.github.io/ts-plate/" element={"Home"} />
        <Route
          path="https://ranami.github.io/ts-plate/todo"
          element={<TodoPage />}
        />
        <Route
          path="https://ranami.github.io/ts-plate/user"
          element={<UserList />}
        />
        <Route
          path="https://ranami.github.io/ts-plate/tasks"
          element={<TasksPage />}
        />
      </Routes>
    </DndProvider>
  );
}

export default App;
