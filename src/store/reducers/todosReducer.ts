import { Reducer } from "react";
import {
  Todo,
  TodoAction,
  TodoActionType,
  TodoState,
} from "../../types/todoTypes";

const todoJson = localStorage.getItem("todos");
const initState = {
  todos: todoJson !== null ? JSON.parse(todoJson) : [],
};

export const todosReducer: Reducer<TodoState, TodoAction> = (
  state = initState,
  action
) => {
  const newState = { ...state };
  switch (action.type) {
    case TodoActionType.ADD_TODO:
      newState.todos = [...state.todos, action.payload];
      break;
    case TodoActionType.REMOVE_TODO:
      newState.todos = state.todos.filter(
        (todo: Todo) => todo.created !== action.payload
      );
      break;
    case TodoActionType.DONE_TODO:
      newState.todos = state.todos.map((todo: Todo) => {
        if (todo.created === action.payload) {
          return {
            ...todo,
            done: action.value,
          };
        }
        return todo;
      });
      break;
    default:
      return state;
  }
  localStorage.setItem("todos", JSON.stringify(newState.todos));
  return newState;
};
