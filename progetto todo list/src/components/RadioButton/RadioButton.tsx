import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Visibility } from "../../features/Filters/Filters";
import "./RadioButton.css";
interface Option {
  option: number;
  label: string;
}
const RadioButton = ({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: number;
  onChange: any;
}) => {
  //view
  const view = useSelector((state: RootState) => state.app.viewMode);

  return (
    <div className="radio-button">
      {options.map(({ option, label }, i: number) => (
        <div key={i}>
          <input
            onClick={() => onChange(option)}
            name="visibility"
            type="radio"
            defaultChecked={option === value ? true : false}
            value={option}
            id={label}
          />
          <label
            htmlFor={label}
            className={`segmented-control__${label} ${view}`}
          >
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioButton;

{
  /* <input
        onClick={() => handleFunction(input)}
        type="radio"
        name="visibility"
        value={input}
        id={text}
        defaultChecked={text === "all" ? true : false}
      />
      */
}
