export enum TodoActionType {
    ADD_TODO = 'ADD_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    DONE_TODO = 'DONE_TODO',
}

export type Todo = {
    todo: string,
    done: boolean,
    created: Date,
}

export type TodoState = {
    todos: Todo[],
}

export type AddTodoAction = {
    type: TodoActionType.ADD_TODO,
    payload: Todo,
}

export type RemoveTodoAction = {
    type: TodoActionType.REMOVE_TODO,
    payload: Date
}

export type DoneTodoAction = {
    type: TodoActionType.DONE_TODO,
    done: boolean,
    payload: Date,
    value: boolean,
}

export type TodoAction = AddTodoAction | RemoveTodoAction | DoneTodoAction;