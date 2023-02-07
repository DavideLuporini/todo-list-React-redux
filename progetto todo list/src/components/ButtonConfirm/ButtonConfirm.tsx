import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "./ButtonConfirm.css";

const AddButton = ({
  handleSubmit,
  text,
}: {
  handleSubmit: any;
  text: string;
}) => {
  //view mode
  const view = useSelector((state: RootState) => state.app.viewMode);
  return (
    <button
      className={`btn-add ms-2 btn-outline-primary ${view}`}
      onClick={() => handleSubmit}
      type="submit"
    >
      <span>{text}</span>
    </button>
  );
};

export default AddButton;
