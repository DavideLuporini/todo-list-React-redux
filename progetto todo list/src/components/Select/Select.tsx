import React from "react";
import { Category } from "../../features/Filters/Filters";
import { Todo } from "../../features/Todo/Todo";
import "./Select.css";
interface Options {
  value: string;
  text: Category;
}
const SelectBadge = ({
  array,
  handleChange,
  selectedOption,
  options,
}: {
  array: any;
  handleChange: any;
  selectedOption: any;
  options: any[];
}) => {
  return (
    <select
      className={`badge ${selectedOption.categoryName} select-input edit-mode`}
      style={{ backgroundColor: `${selectedOption.color}` }}
      value={selectedOption.sys.id}
      onChange={(e) =>
        handleChange({
          categoryName: e.target.options[e.target.selectedIndex].text,
          sys: { id: e.target.value },
        })
      }
    >
      {options.map((category, i: number) => (
        <option
          className={`badge ${category.categoryName}`}
          key={i}
          value={`${category.sys.id}`}
        >
          {category.categoryName}
        </option>
      ))}
    </select>
  );
};

export default SelectBadge;
