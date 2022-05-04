import { debounce, IconButton, Popover, styled } from "@mui/material";
import { FC, useCallback, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { Item, TaskActionType } from "../types/taskTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";

const SubTaskBlock = styled("div")`
  width: 230px;
  height: 130px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-bottom: 25px;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const SubTaskData = styled("div")`
  margin-left: 20px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding-top: 25px;
`;

const DateText = styled("div")`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #787878;
`;

const Name = styled("div")`
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 110px;
`;

const TaskProgress = styled("div")`
  background-color: #1369bf;
  width: 60px;
  color: white;
  border-radius: 4px;
  padding: 5px;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
`;

const CustomIconButton = styled(IconButton)`
  pointer-events: all;
`;

type Props = {
  item: Item;
  index: number;
};

export const TaskBlock: FC<Props> = ({ item, index }) => {
  enum Months {
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  }

  const getTime = useCallback(
    (date: Date) => {
      return `${date.getDate()} ${Months[date.getMonth()]}, в ${
        date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
      }:${
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()
      }`;
    },
    [Months]
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "taskBlock",
    item: { item, dragIndex: index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const dispatch = useDispatch();

  const anchorEl = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [delayHandler, setDelayHandler] = useState(0);

  const handleClick = () => {
    setDelayHandler(
      window.setTimeout(() => {
        setOpen(!open);
      }, 500)
    );
  };

  const handleClose = () => {
    clearTimeout(delayHandler);
    if (open) {
      setOpen(!open);
    }
  };

  const handleDelete = () => {
    const result = window.confirm("Удалить?");
    if (result) {
      dispatch({ type: TaskActionType.DELETE_TASK, payload: { item, index } });
    }
    setOpen(!open);
  };

  return (
    <div ref={anchorEl} onMouseEnter={handleClick} onMouseLeave={handleClose}>
      <SubTaskBlock key={item.taskId} ref={drag}>
        <SubTaskData>
          <TaskProgress>{item.taskTypeName}</TaskProgress>
          <DateText>{getTime(new Date(item.createTimestamp))}</DateText>
          <Name>{item.clientName ? item.clientName : "Неизвестный"}</Name>
        </SubTaskData>

        <Popover
          open={open}
          anchorEl={anchorEl.current}
          style={{ pointerEvents: "none" }}
          id={`task-item-${item.taskId}`}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <CustomIconButton onClick={handleDelete}>
            <DeleteIcon />
          </CustomIconButton>
        </Popover>
      </SubTaskBlock>
    </div>
  );
};
