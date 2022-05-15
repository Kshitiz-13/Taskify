import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddTask = () => {
  const {
    isLoading,
    isTaskEditing,
    showAlert,
    displayAlert,
    task,
    taskType,
    taskTypeOptions,
    taskStatus,
    taskStatusOptions,
    handleChange,
    clearValues,
    createTask,
    editTask,
  } = useAppContext();
  console.log(taskStatus);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task || !taskType) {
      displayAlert();
      return;
    }
    if (isTaskEditing) {
      editTask();
      return;
    }
    createTask();
  };
  const handleTaskInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <>
      <Wrapper>
        <form className="form">
          <h3>{isTaskEditing ? "edit Task" : "add Task"}</h3>
          {showAlert && <Alert />}
          <div className="form-center">
            {/* task */}
            <FormRow
              type="text"
              name="task"
              value={task}
              handleChange={handleTaskInput}
            />

            {/* status */}
            <FormRowSelect
              name="taskStatus"
              labelText="task-status"
              value={taskStatus}
              handleChange={handleTaskInput}
              list={taskStatusOptions}
            />
            {/* type */}
            <FormRowSelect
              name="taskType"
              labelText="task-type"
              value={taskType}
              handleChange={handleTaskInput}
              list={taskTypeOptions}
            />
            {/* btn container */}
            <div className="btn-container">
              <button
                type="submit"
                className="btn btn-block submit-btn"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                submit
              </button>
              <button
                className="btn btn-block clear-btn"
                onClick={(e) => {
                  e.preventDefault();
                  clearValues();
                }}
              >
                clear
              </button>
            </div>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default AddTask;
