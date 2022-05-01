import { styled } from "@mui/material";
import { FC, useCallback } from "react";
import { useDrag } from "react-dnd";
import { Item } from "../types/taskTypes";

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
  return (
    <SubTaskBlock key={item.taskId} ref={drag}>
      <SubTaskData>
        <TaskProgress>{item.taskTypeName}</TaskProgress>
        <DateText>{getTime(new Date(item.createTimestamp))}</DateText>
        <Name>{item.clientName ? item.clientName : "Неизвестный"}</Name>
      </SubTaskData>
    </SubTaskBlock>
  );
};
