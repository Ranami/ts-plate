import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Todo, TodoActionType } from "../types/todoTypes";

export const TodoPage = () => {
  const { todos } = useTypedSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleCreate = useCallback(
    (todo: Todo) => {
      dispatch({ type: TodoActionType.ADD_TODO, payload: todo });
    },
    [dispatch]
  );

  const handleTodoChange = useCallback(
    (created: Date, value: boolean) => {
      dispatch({
        type: TodoActionType.DONE_TODO,
        payload: created,
        value,
      });
    },
    [dispatch]
  );

  return (
    <div>
      <TodoForm onCreate={handleCreate} />
      <TodoList todos={todos} onTodoChange={handleTodoChange} />
    </div>
  );
};
