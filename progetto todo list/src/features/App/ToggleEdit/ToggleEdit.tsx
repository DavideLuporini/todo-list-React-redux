import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { setEditMode } from "../../appSlice";
import "./ToggleEdit.css";
const ToggleEdit = ({
  handleFunction,
  editMode,
  toggle,
}: {
  handleFunction: any;
  editMode: boolean;
  toggle: string | boolean;
}) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const view = useSelector((state: RootState) => state.app.viewMode);
  const edit = useSelector((state: RootState) => state.app.editMode);

  const handleClickEdit = () => {
    handleFunction();
  };

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(setEditMode(false));
    }
  }, [todos]);

  return (
    <>
      {todos.length > 0 && toggle === true ? (
        <div
          id="edit-container"
          className=" col-auto d-flex justify-content-start align-items-center w-100 active"
        >
          <h2 id="toggle-edit-title" className={`m-0 ${view}`}>
            edit <span className="hide-on-small">mode</span>
          </h2>
          <div className="switch-edit">
            <div className={`switch-edit-active ${view}`}>
              <input
                id="switch-edit"
                type="checkbox"
                defaultChecked={edit ? true : false} // perchè rimane checked?
                className={`${edit}`}
              />
              <label
                onClick={() => handleClickEdit()}
                htmlFor="switch-edit"
              ></label>
            </div>
          </div>
        </div>
      ) : (
        <></>
        // <div
        //   id="edit-container"
        //   className="d-flex justify-content-start align-items-center w-100 not-active"
        // >
        //   <h2 id="toggle-edit-title" className={`m-0 ${view}`}>
        //     edit <span className="hide-on-small">mode</span>
        //   </h2>
        //   <div className="switch-edit">
        //     <div className={`switch-edit-active ${view}`}>
        //       <input
        //         id="switch-edit"
        //         type="checkbox"
        //         defaultChecked={edit ? true : false}
        //         className={`${edit}`}
        //       />
        //       <label
        //         onClick={() => handleClickEdit()}
        //         htmlFor="switch-edit"
        //       ></label>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default ToggleEdit;
