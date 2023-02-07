import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ToggleEdit from "../App/ToggleEdit/ToggleEdit";
import ToggleMode from "../App/ToggleViewMode/ToggleViewMode";
import "./Settings.css";

const SettingsBar = ({
  handleFunction,
  editMode,
}: {
  handleFunction: any;
  editMode: boolean;
}) => {
  //view mode
  const view = useSelector((state: RootState) => state.app.viewMode);
  //click function
  const handleClickEdit = () => {
    handleFunction();
  };

  //toggle
  const [toggle, setToggle] = useState<boolean | string>("");
  const toggleBar = () => {
    toggle === "" || toggle === false ? setToggle(true) : setToggle(false);
  };

  return (
    <div
      id="settings-container"
      className={`${
        toggle
          ? `d-flex align-items-start align-items-center open ${view}`
          : `d-flex align-items-start align-items-center closed ${view}`
      } `}
    >
      <FontAwesomeIcon
        onClick={() => toggleBar()}
        className={`${toggle ? "open" : "closed"}  my-2 gear`}
        icon={faGear}
      />

      <div className="col-auto">
        <ToggleMode toggle={toggle} />
      </div>
      <div className="col-auto">
        <ToggleEdit
          handleFunction={handleClickEdit}
          editMode={editMode}
          toggle={toggle}
        />
      </div>
    </div>
  );
};

export default SettingsBar;
