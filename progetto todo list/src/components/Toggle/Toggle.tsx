import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Mode } from "../../features/app";
import "./Toggle.css";

const Toggle = ({ handleFunction }: { handleFunction: any }) => {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.app.viewMode);
  const [isClicked, setIsClicked] = useState(true);

  const handleClick = () => {
    handleFunction();
    useState(!isClicked);
  };
  return (
    <>
      {isClicked === true ? (
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
                  //default checked deve essere variabile , anche view deve essere variabile nel caso del toggle
                  defaultChecked={view === Mode.DARK ? true : false}
                />
                <label
                  onClick={() => handleClick()}
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
                onClick={() => handleClick()}
                htmlFor="switch-mode"
              ></label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toggle;
