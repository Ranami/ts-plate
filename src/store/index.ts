import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { taskReducer } from "./reducers/taskReducer";
import { todosReducer } from "./reducers/todosReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
  tasks: taskReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type IState = ReturnType<typeof rootReducer>;
