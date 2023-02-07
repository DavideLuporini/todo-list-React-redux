import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import SearchBar from "../../features/Filters/SaerchText/SearchText";
import { useDispatch } from "react-redux";
import { setSearchedText } from "../../features/Filters/FilterSlice";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  //view mode
  const view = useSelector((state: RootState) => state.app.viewMode);

  const handleClick = () => {
    setIsSearchClicked(!isSearchClicked);
    dispatch(setSearchedText(""));
  };

  function deleteSearchText() {
    dispatch(setSearchedText(""));
  }

  const text = useSelector((state: RootState) => state.filters.searchText);
  return (
    <>
      <header id="header-website" className={view}>
        <SearchBar text={text} handleClick={handleClick} />

        <span
          className={
            !isSearchClicked ? "todolist-title" : "todolist-title active"
          }
        >
          {text !== "" ? (
            <div
              className="d-flex align-items-center"
              onClick={() => deleteSearchText()}
            >
              <p className="m-0 text-uppercase">{text}</p>

              <FontAwesomeIcon className="ms-2" icon={faXmark} />
            </div>
          ) : (
            "All todos"
          )}
        </span>
      </header>
    </>
  );
};

export default Header;
