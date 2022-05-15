import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchTaskContainer = () => {
  const {
    isLoading,
    taskSearch,
    taskSearchStatus,
    taskSearchType,
    taskSort,
    sortOptions,
    handleChange,
    clearFilters,
    taskTypeOptions,
    taskStatusOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>Task search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="text"
            name="taskSearch"
            value={taskSearch}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="taskSearchStatus"
            value={taskSearchStatus}
            handleChange={handleSearch}
            list={["all", ...taskStatusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="taskSearchType"
            value={taskSearchType}
            handleChange={handleSearch}
            list={["all", ...taskTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="taskSort"
            value={taskSort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchTaskContainer;
