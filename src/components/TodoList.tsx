import { useMemo } from "react";
import { Todo } from "../types/todoTypes";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onTodoChange(arg: Date, done: boolean): void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onTodoChange }) => {
  const sortedTodos = useMemo(() => {
    const s = [...todos];
    const completedTodos = s.filter((item) => item.done);
    const currentTodos = s.filter((item) => !item.done);
    return { completedTodos, currentTodos };
  }, [todos]);

  return (
    <div
      style={{ display: "flex", gap: "25px", justifyContent: "space-around" }}
    >
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
          alignItems: "center",
          width: 1000,
        }}
      >
        <h2>Need to complete</h2>
        {sortedTodos?.currentTodos.map((todo) => (
          <TodoItem
            todo={todo}
            onTodoChange={onTodoChange}
            key={todo.created.toLocaleString()}
          />
        ))}
      </ul>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
          alignItems: "center",
          width: 1000,
        }}
      >
        <h2>Completed todos</h2>
        {sortedTodos?.completedTodos.map((todo) => (
          <TodoItem
            todo={todo}
            onTodoChange={onTodoChange}
            key={todo.created.toLocaleString()}
          />
        ))}
      </ul>
    </div>
  );
};
