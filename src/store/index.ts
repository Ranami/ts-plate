import { applyMiddleware, combineReducers, createStore } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { todosReducer } from "./reducers/todosReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    todos: todosReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type IState = ReturnType<typeof rootReducer>;