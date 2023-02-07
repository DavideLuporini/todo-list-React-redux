import React from "react";
import { AddTodoForm } from "../../features/Todo/AddTodoForm/AddTodoForm";
import TodoList from "../../features/Todo/TodoList/TodoList";
import "./Todos.css";
import VisibilityFilter from "../../features/Filters/VisibilityFilter/VisibilityFilter";
import { useDispatch, useSelector } from "react-redux";
import TagFilter from "../../features/Filters/TagFilter/TagFilter";
import { RootState } from "../../app/store";
import Header from "../../components/Header/Header";
import { setEditMode } from "../../features/appSlice";
import SettingsBar from "../../features/Settings/Settings";
import DeleteTag from "../../components/ButtonDeleteBadge/ButtonDeleteBadge";
import { createTodoInContentfull } from "../../client/client";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todo.todos);
  const tagFilters = useSelector(
    (state: RootState) => state.filters.categories
  );
  const view = useSelector((state: RootState) => state.app.viewMode);
  const editMode = useSelector((state: RootState) => state.app.editMode);

  function handleClickEdit() {
    dispatch(setEditMode(!editMode));
  }
  function handleClick() {
    createTodoInContentfull();
  }
  return (
    <>
      <div className="container-sm">
        <div className="row">
          <div className="col-12 d-flex-align-items-start">
            <SettingsBar handleFunction={handleClickEdit} editMode={editMode} />
          </div>
        </div>
      </div>

      <Header />
      <div className="container-sm">
        <div className="row">
          {editMode && todos === 0 ? <></> : <AddTodoForm />}

          {todos.length > 0 ? (
            <>
              <section id="filter-container" className="">
                <div className="row d-flex justify-content-between mb-4">
                  <div className="col-auto pe-0">
                    {!tagFilters ? <></> : <TagFilter />}
                  </div>

                  <ul
                    id="tag-filter-list"
                    className="col-12 col-sm d-flex flex-direction-row  align-items-center"
                  >
                    {" "}
                    {tagFilters?.map((element, i: number) => (
                      <DeleteTag key={i} text={element} />
                    ))}
                  </ul>
                  <div className="col-auto">
                    <VisibilityFilter></VisibilityFilter>
                  </div>
                </div>
              </section>
              <TodoList toggle={editMode} />
            </>
          ) : (
            <div id="empty-container" className="">
              {" "}
              <div className={`title ${view}`}> Nothing to do</div>
              {` `}
              <div className={`sub-title ${view}`}> add a task</div>
              {` `}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
