import { styled } from "@mui/material";
import { FC } from "react";
import { Item, Task, TaskActionType } from "../types/taskTypes";
import { TaskBlock } from "./TaskBlock";
import { DropTargetOptions, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

type Props = {
  subtasks: Task;
  index: number;
};

const SubtasksWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  width: 230px;
  min-height: 2000px;
`;

const EmptyBlock = styled("div")`
  width: 230px;
  height: 130px;
  line-height: 130px;
  background: #b5b5b5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-bottom: 25px;
  font-size: 25px;
  text-align: center;
`;

type Response = {
  item: Item;
  dragIndex: number;
};

export const TasksList: FC<Props> = ({ subtasks, index }) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "taskBlock",
    drop: (response: Response, monitor: DropTargetOptions) => {
      const dropTarget = [...monitor.internalMonitor.registry.dropTargets]
        .map((item) => {
          return item[0];
        })
        .indexOf(monitor.targetId);
      DragDropSubtask(response.item, response.dragIndex, dropTarget);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const DragDropSubtask = (
    item: Item,
    dragIndex: number,
    dropIndex: number
  ) => {
    dispatch({
      type: TaskActionType.DRAG_N_DROP,
      payload: { item, dragIndex, dropIndex },
    });
  };

  return (
    <SubtasksWrapper ref={drop} style={{ opacity: isOver ? "0.6" : "1" }}>
      {subtasks.items.length !== 0 ? (
        subtasks?.items.map((item: Item) => (
          <TaskBlock item={item} key={item.taskId} index={index} />
        ))
      ) : (
        <EmptyBlock>Пусто</EmptyBlock>
      )}
    </SubtasksWrapper>
  );
};
