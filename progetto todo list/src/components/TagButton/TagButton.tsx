import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  removeFilterCategory,
  setFilterCategory,
} from "../../features/Filters/FilterSlice";
import "./TagButton.css";

const TagButton = ({ text, color }: { text: string; color: string }) => {
  //view mode
  const view = useSelector((state: RootState) => state.app.viewMode);
  //selector for tag filters state
  const tagFilters = useSelector(
    (state: RootState) => state.filters.categories
  );
  //Add a tag filter into the store
  const handleAddTag = (text: any) => {
    dispatch(setFilterCategory(text));
  };

  const dispatch = useDispatch();

  //Add a tag filter into the store
  const handleRemoveTag = (text: string) => {
    dispatch(removeFilterCategory(text));
  };

  //logic that handle case
  const handleClick = (text: string) => {
    if (tagFilters.includes(text)) {
      handleRemoveTag(text);
    } else {
      handleAddTag(text);
    }
  };

  return (
    <>
      <div
        key={text}
        className={
          tagFilters.includes(text)
            ? `tag-control mx-1`
            : "no tag-control mx-1 d-flex justify-content-left"
        }
      >
        <input
          onClick={() => handleClick(text)}
          type="checkbox"
          name="visibility"
          value={text}
          id={text}
          defaultChecked={tagFilters.includes(text) ? true : false}
        />
        <label
          htmlFor={text}
          className={`tag-checkbox ${text} ${view}`}
          style={{ backgroundColor: `${color}` }}
        >
          <p className="m-0">{text}</p>
        </label>
      </div>
    </>
  );
};

export default TagButton;
