import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Mode } from "../../app";
import { setMode } from "../../appSlice";
import "./ToggleViewMode.css";
const ToggleEdit = ({ toggle }: { toggle: string | boolean }) => {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.app.viewMode);

  function handleClickViewMode() {
    view === Mode.LIGHT
      ? dispatch(setMode(Mode.DARK))
      : dispatch(setMode(Mode.LIGHT));
  }

  return (
    <>
      {toggle === true ? (
        <>
          <div
            id="mode-container"
            className={
              "col-auto d-flex justify-content-start align-items-center w-100 active"
            }
          >
            <h2 id="toggle-mode-title" className={`m-0 ${view}`}>
              {view} <span className="hide-on-small">mode</span>
            </h2>
            <div className="switch-mode">
              <div className={`switch-mode-active ${view}`}>
                <input
                  id="switch-mode"
                  type="checkbox"
                  value={view}
                  defaultChecked={view === Mode.DARK ? true : false}
                />
                <label
                  onClick={() => handleClickViewMode()}
                  htmlFor="switch-mode"
                ></label>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          id="mode-container"
          className={
            "col-auto d-flex justify-content-start align-items-center w-100 not-active"
          }
        >
          <h2 id="toggle-mode-title" className={`m-0 ${view}`}>
            {view} <span className="hide-on-small">mode</span>
          </h2>
          <div className="switch-mode">
            <div className={`switch-mode-active ${view}`}>
              <input id="switch-mode" type="checkbox" />
              <label
                onClick={() => handleClickViewMode()}
                htmlFor="switch-mode"
              ></label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToggleEdit;
