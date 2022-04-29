import { Button, Checkbox, styled } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Todo, TodoActionType } from "../types/todoTypes";
import CloseIcon from "@mui/icons-material/Close";

interface TodoItemProps {
  todo: Todo;
  onTodoChange(arg: Date, done: boolean): void;
}

const Wrapper = styled("div")`
  border: 1px solid grey;
  border-radius: 3px;
  font-size: 16px;
  margin-bottom: 10px;
  width: 615px;
  padding-left: 10px;
  box-sizing: border-box;
  height: 80px;
`;

const CustomCheckbox = styled(Checkbox)`
  position: absolute;
  right: -3px;
  top: 40px;
  &:hover {
    background-color: transparent;
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  right: -15px;
  top: -5px;
  &:hover {
    background-color: transparent;
  }
`;

const DateLabel = styled("div")`
  font-size: 16px;
  position: absolute;
  top: 55px;
  left: 0;
  color: grey;
`;

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onTodoChange }) => {
  const dispatch = useDispatch();

  const created = useMemo(() => {
    return new Date(todo.created).toLocaleString();
  }, [todo.created]);

  const handleRemove = useCallback(() => {
    dispatch({ type: TodoActionType.REMOVE_TODO, payload: todo.created });
  }, [todo.created, dispatch]);

  return (
    <Wrapper>
      <li style={{ listStyle: "none", fontSize: "20px", position: "relative" }}>
        <div
          style={{
            fontSize: "24px",
            textDecoration: todo.done ? "line-through red" : "none",
          }}
        >
          {todo.todo}
        </div>

        <CloseButton size="small" onClick={handleRemove}>
          <CloseIcon sx={{ color: "red", fontSize: 35 }} />
        </CloseButton>
        <CustomCheckbox
          onChange={() => onTodoChange(todo.created, !todo.done)}
          checked={todo.done}
        />
        <DateLabel>{created}</DateLabel>
      </li>
    </Wrapper>
  );
};
