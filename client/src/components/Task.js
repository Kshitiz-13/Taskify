import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

const Task = ({ _id, task, taskType, createdAt, status }) => {
  const { setEditTask, deleteTask } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{task.charAt(0)}</div>
        <div className="info">
          <h5>{task}</h5>
          {/* <p>{company}</p> */}
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          {/* <JobInfo icon={<FaLocationArrow />} text={jobLocation} /> */}
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={taskType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-task"
              className="btn edit-btn"
              onClick={() => setEditTask(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteTask(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Task;
