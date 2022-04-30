import { styled } from "@mui/material";
import { FC } from "react";
import { Item, Task } from "../types/taskTypes";
import { TaskBlock } from "./TaskBlock";

export type Props = {
  subtasks: Task;
};

export const SubtasksWrapper = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const TasksList: FC<Props> = ({ subtasks }) => {
  return (
    <SubtasksWrapper>
      {subtasks?.items.map((item: Item) => (
        <TaskBlock item={item} key={item.taskId} />
      ))}
    </SubtasksWrapper>
  );
};
