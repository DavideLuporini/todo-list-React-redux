import "./DeleteTodoButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ButtonDelete = ({
  handleRemove,
  text,
  id,
}: {
  handleRemove: any;
  text: string;
  id: number;
}) => {
  return (
    <button
      className="btn-remove"
      onClick={() => handleRemove(id)}
      type="submit"
    >
      <FontAwesomeIcon icon={faTrash} className="icon-trash" />
    </button>
  );
};

export default ButtonDelete;
