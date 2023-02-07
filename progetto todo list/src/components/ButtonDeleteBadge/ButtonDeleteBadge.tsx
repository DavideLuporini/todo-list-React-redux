import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { removeFilterCategory } from "../../features/Filters/FilterSlice";
import "./ButtonDeleteBadge.css";

const DeleteTag = ({ text }: { text: string }) => {
  const dispatch = useDispatch();

  const handleRemoveClick = (text: string) => {
    dispatch(removeFilterCategory(text));
  };

  return (
    <>
      <li key={text} className={` col-auto  tag-delete mx-1`}>
        <input
          onClick={() => handleRemoveClick(text)}
          type="checkbox"
          name="visibility"
          value={text}
          id={text}
          defaultChecked={true}
        />
        <label
          htmlFor={text}
          className={`w-100 tag-checkbox-delete ${text}`}
          style={{ backgroundColor: `${text}` }}
        >
          {text}
          <FontAwesomeIcon className="ms-1" icon={faXmark} />
        </label>
      </li>
    </>
  );
};

export default DeleteTag;
