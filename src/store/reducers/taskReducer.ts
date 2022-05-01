import { Reducer } from "redux";
import { TaskAction, TaskActionType, TaskState } from "../../types/taskTypes";

const initState = {
  loading: false,
  tasks: [],
};
export const taskReducer: Reducer<TaskState, TaskAction> = (
  state = initState,
  action
) => {
  switch (action.type) {
    case TaskActionType.FETCH_TASKS:
      return { ...state, loading: true, error: undefined };
    case TaskActionType.FETCH_TASKS_SUCCESS:
      return { ...state, tasks: action.payload, loading: false };
    case TaskActionType.FETCH_TASKS_REJECT:
      return { ...state, error: action.payload, loading: false };
    case TaskActionType.DRAG_N_DROP:
      if (action.payload.dragIndex === action.payload.dropIndex) return state;
      const changedTasks = state.tasks.map((subtasks, index) => {
        if (index === action.payload.dropIndex) {
          subtasks.items.splice(0, 0, action.payload.item);
        }
        if (index === action.payload.dragIndex) {
          const changedSubtasks = subtasks.items.filter(
            (subtask) => subtask.taskId !== action.payload.item.taskId
          );
          return { ...subtasks, items: changedSubtasks };
        }

        return { ...subtasks };
      });

      return { tasks: [...changedTasks], loading: state.loading };
    default:
      return state;
  }
};
