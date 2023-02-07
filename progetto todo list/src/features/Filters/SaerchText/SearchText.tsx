import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { setSearchedText } from "../FilterSlice";
import InputFilter from "../../../components/InputText/InputText";
import "./SearchText.css";

function SearchBar({ handleClick, text }: { handleClick: any; text: string }) {
  const dispatch = useDispatch();
  const [isBarClicked, setIsBarClicked] = useState<boolean>(false);

  //view mode
  const view = useSelector((state: RootState) => state.app.viewMode);
  // todo list
  const todos = useSelector((state: RootState) => state.todo.todos);

  function handleClickBar() {
    handleClick();
    setIsBarClicked(!isBarClicked);
  }

  function handleChangeInput(event: any) {
    dispatch(setSearchedText(event));
  }

  return (
    <>
      <div
        className={
          isBarClicked
            ? `form-search d-flex justify-content-evenly align-items-center active ${view}`
            : `form-search d-flex justify-content-evenly align-items-center ${view}`
        }
      >
        {todos.length > 0 ? (
          <label htmlFor="searchbar-input">
            <FontAwesomeIcon
              onClick={() => handleClickBar()}
              className={isBarClicked ? "glass active" : "glass"}
              icon={faMagnifyingGlass}
            />
          </label>
        ) : (
          <label htmlFor="searchbar-input">
            <FontAwesomeIcon
              className={" glass disabled"}
              icon={faMagnifyingGlass}
              role="button"
            />
          </label>
        )}
        <InputFilter
          handleChange={handleChangeInput}
          toggle={isBarClicked}
          text={text}
        />
      </div>
      {isBarClicked ? (
        <FontAwesomeIcon
          onClick={() => handleClickBar()}
          className={isBarClicked ? "glass active" : "glass "}
          icon={faXmark}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default SearchBar;
