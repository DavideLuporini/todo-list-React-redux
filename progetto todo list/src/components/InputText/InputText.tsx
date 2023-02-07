import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setSearchedText } from "../../features/Filters/FilterSlice";
import "./InputText.css";

const InputFilter = ({
  toggle,
  text,
  handleChange,
}: {
  toggle: boolean;
  text: string;
  handleChange: any;
}) => {
  //view mode
  const view = useSelector((state: RootState) => state.app.viewMode);
  const [input, setInput] = useState<string>("");

  // voglio che aggiorni solo al cambiare di input
  useEffect(() => {
    if (!toggle) {
      setInput("");
    }
  }, [toggle]);

  return (
    <div className="w-100">
      <form className="my-2 d-flex flex-column align-items-center">
        <input
          type="text"
          placeholder="search"
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          className={
            toggle
              ? `searchbar-input active ${view}
            ${view}`
              : `searchbar-input ${view}
            ${view}`
          }
        />
      </form>
    </div>
  );
};

export default InputFilter;
