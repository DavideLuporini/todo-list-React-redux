import "./SelectTodoItemTag.css";
import { getTagFromContentfull } from "../../../client/client";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
const SelectTag = ({
  singleTodo,
  handleChangeTag,
  tag,
}: {
  singleTodo: any;
  handleChangeTag: any;
  tag: any;
}) => {
  //todo
  const categories = useSelector((state: RootState) => state.todo.categories);
  return (
    <select
      className={`tag ${singleTodo.tag} select-input edit-mode`}
      value={tag.text}
      onChange={(e) =>
        handleChangeTag({
          sys: { id: e.target.value },
          categoryName: e.target.options[e.target.selectedIndex].text,
        })
      }
    >
      {categories.map((item: any) => (
        <option key={item.sys.id} value={item.sys.id}>
          {item.categoryName}
        </option>
      ))}
    </select>
  );
};

export default SelectTag;
