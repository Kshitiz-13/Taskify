import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Task from "./Task";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";

const TasksContainer = () => {
  const {
    getTasks,
    tasks,
    isLoading,
    page,
    totalTasks,
    taskSearch,
    taskSearchStatus,
    taskSearchType,
    taskSort,
    numOfPagesTasks,
  } = useAppContext();
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, [page, taskSearch, taskSearchStatus, taskSearchType, taskSort]);
  if (isLoading) {
    return <Loading center />;
  }

  if (tasks.length === 0) {
    return (
      <Wrapper>
        <h2>No tasks to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalTasks} Task{tasks.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {tasks.map((task) => {
          console.log(task);
          return <Task key={task._id} {...task} />;
        })}
      </div>
      {numOfPagesTasks > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default TasksContainer;
