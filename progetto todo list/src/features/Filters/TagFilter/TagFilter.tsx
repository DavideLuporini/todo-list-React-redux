import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { setFilterCategory } from "../FilterSlice";
import TagButton from "../../../components/TagButton/TagButton";
import "./TagFilter.css";
import { Category } from "../Filters";

const TagFilter = () => {
  const dispatch = useDispatch();
  const [tag, setTag] = useState<any>(Category.NOFILTER);

  const view = useSelector((state: RootState) => state.app.viewMode);
  const edit = useSelector((state: RootState) => state.app.editMode);
  const categories = useSelector((state: RootState) => state.todo.categories);

  // voglio che aggiorni solo al cambiare di input
  useEffect(() => {
    dispatch(setFilterCategory(tag));
  }, [tag]);
  const [isFiltersClicked, setIsClicked] = useState<boolean>(false);

  const handleClickFilters = () => {
    setIsClicked(!isFiltersClicked);
  };

  return (
    <>
      <div
        id="tag-filters-container"
        className="d- inline-flex align-items-center justify-content-left flex-row"
      >
        <button
          id="tag-filters-button"
          className={
            isFiltersClicked
              ? `d-flex justify-content-center align-items-center col-auto ${view} clicked text-primary`
              : `d-flex justify-content-center align-items-center col-auto ${view}`
          }
          onClick={() => handleClickFilters()}
        >
          Filters{" "}
          {isFiltersClicked ? (
            <FontAwesomeIcon className="ms-2" icon={faXmark} />
          ) : (
            <FontAwesomeIcon className="ms-2" icon={faPlus} />
          )}
        </button>

        {isFiltersClicked ? (
          <>
            <div
              id="modal-filters-tag"
              className={`row justify-content-start align-items-center my-2 0-0 ${edit}`}
            >
              <div
                id="filter-modal-container"
                className="col-auto flex-column d-flex align-items-center p-0"
              >
                {categories.map((category, i: number) => (
                  <TagButton
                    text={category.categoryName}
                    color={category.color}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default TagFilter;
