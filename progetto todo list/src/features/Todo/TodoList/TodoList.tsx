import { useSelector, useDispatch } from "react-redux";
import { toggleCompleted } from "../todosSlice";
import { getFilteredTodos } from "../todosSlice";
import "./TodoList.css";
import SingleTodo from "../TodoItem/TodoItem";
import { RootState } from "../../../app/store";

const TodoList = ({ toggle }: { toggle: boolean }) => {
  const dispatch = useDispatch();

  const view = useSelector((state: RootState) => state.app.viewMode);
  const todos = useSelector(getFilteredTodos);

  // function to toggle the single todo
  const handleToggle = (id: number) => {
    dispatch(toggleCompleted(id));
  };
  return (
    <>
      <div className="container">
        <div className="row align-items-center">
          <div className="col flex-grow-1 d-flex justify-content-end flex-column"></div>
        </div>
        <div className="row">
          <div
            className={
              toggle
                ? "edit-todos-mode-container active"
                : "edit-todos-mode-container"
            }
          ></div>
          <ul
            className={
              toggle
                ? "edit-todos-mode-list  todolist active"
                : "edit-todos-mode-list todolist "
            }
          >
            <div className={toggle ? "fadeEffect in" : "fadeEffect out"}></div>
            {todos.length > 0 ? (
              todos.map((singleTodo, i: number) => (
                <SingleTodo
                  key={i}
                  singleTodo={singleTodo}
                  toggle={toggle}
                  handleToggle={handleToggle}
                />
              ))
            ) : (
              <li
                id="no-task-container"
                className={`row h-100 justify-content-center align-content-center ${view}`}
              >
                <div className="col-12 ">
                  <span className="no-task-title">No task found</span>
                </div>
                <div className="col-12">
                  <span className="no-task-subtitle">
                    Change filters to find your tasks
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;
