import { CircularProgress, styled } from "@mui/material";
import { useEffect } from "react";
import { TasksList } from "../components/TasksList";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useTaskActions } from "../hooks/useTaskActions";

const Wrapper = styled("div")`
  margin-left: 25px;
`;

const Header = styled("h2")`
  font-weight: 600;
  font-size: 30px;
  line-height: 35px;
`;

const TasksWrapper = styled("div")`
  display: flex;
  gap: 25px;
`;

const SubtaskHeader = styled("h2")`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 30px;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    top: 100%;
    background: #787878;
    left: 0;
    margin-top: 10px;
  }
`;

const TasksAmount = styled("span")`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  padding: 4px;
  color: #625f6d;
  background-color: #bcbcbc;
  box-sizing: border-box;
`;

export const TasksPage = () => {
  const { tasks, error, loading } = useTypedSelector((state) => state.tasks);
  const { fetchTasks } = useTaskActions();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <h1 style={{ border: "1px solid red" }}>{error}</h1>;
  }

  return (
    <Wrapper>
      <Header>Задачи Насырова Рамира</Header>
      <TasksWrapper>
        {tasks.map((subtasks, index) => {
          return (
            <div key={subtasks.stage}>
              <SubtaskHeader>
                {subtasks.stageName}&ensp;
                <TasksAmount>{subtasks?.items.length}</TasksAmount>
              </SubtaskHeader>
              <TasksList subtasks={subtasks} index={index} />
            </div>
          );
        })}
      </TasksWrapper>
    </Wrapper>
  );
};
