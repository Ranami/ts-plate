export enum TaskActionType {
  FETCH_TASKS = "FETCH_TASKS",
  FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
  FETCH_TASKS_REJECT = "FETCH_TASKS_REJECT",
  DRAG_N_DROP = "DRAG_N_DROP",
  DELETE_TASK = "DELETE_TASK",
}

export type Item = {
  clientId: string;
  clientName: string;
  createTimestamp: Date;
  plannedEndTime: Date;
  plannedStartTime: Date;
  taskId: string;
  taskTypeId: number;
  taskTypeName: string;
};

export type Task = {
  items: Item[];
  stage: string;
  stageName: string;
};

export type TaskState = {
  tasks: Task[];
  loading: boolean;
  error?: string;
};

export type FetchTaskAction = {
  type: TaskActionType.FETCH_TASKS;
};

export type FetchTaskSucessAction = {
  type: TaskActionType.FETCH_TASKS_SUCCESS;
  payload: Task[];
};

export type FetchTaskRejectAction = {
  type: TaskActionType.FETCH_TASKS_REJECT;
  payload: string;
};

type DeleteTaskAction = {
  type: TaskActionType.DELETE_TASK;
  payload: { item: Item; index: number };
};

type DragNDropPayload = {
  item: Item;
  dragIndex: number;
  dropIndex: number;
};

export type DragNDropAction = {
  type: TaskActionType.DRAG_N_DROP;
  payload: DragNDropPayload;
};

export type TaskAction =
  | FetchTaskAction
  | FetchTaskSucessAction
  | FetchTaskRejectAction
  | DragNDropAction
  | DeleteTaskAction;
