import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faCircleCheck,
  faRotateBack,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import Badge from "../../../components/Badge/Badge";
import SelectBadge from "../../../components/Select/Select";
import ButtonDelete from "../../../components/DeleteTodoButton/DeleteTodoButton";
import { removeTodo, editTodo } from "../todosSlice";
import "./TodoItem.css";
import { Category } from "../../Filters/Filters";
import { deleteTodoEntry, updateAnEntry } from "../../../client/client";

const SingleTodo = ({
  singleTodo,
  toggle,
  handleToggle,
}: {
  singleTodo: any;
  toggle: boolean;
  handleToggle: any;
}) => {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.app.viewMode);
  const edit = useSelector((state: RootState) => state.app.editMode);
  const loading = useSelector((state: RootState) => state.todo.loading);
  const categories = useSelector((state: RootState) => state.todo.categories);
  const handleRemove = (id: number) => {
    dispatch(removeTodo(singleTodo.sys.id));
    deleteTodoEntry(singleTodo.sys.id);
  };

  const [tag, setTag] = useState<any>(singleTodo.tag);
  const [text, setText] = useState<string>(singleTodo.text);
  const [confirm, setConfirm] = useState<boolean>(false);

  //used to store the old state
  const [oldState, setOldState] = useState<any>();
  useEffect(() => {
    setOldState({
      text: singleTodo.text,
      tag: tag,
      sys: {
        id: singleTodo.sys.id,
      },
      completed: singleTodo.completed,
    });
  }, [toggle]);
  useEffect(() => {
    setTag(singleTodo.tag);
  }, []);

  function handleChangeTag(tag: any) {
    setTag(tag);
  }

  function handleChangeText(event: any) {
    setText(event);
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      editTodo({
        text: text,
        tag: {
          categoryName: tag.categoryName,
          sys: {
            id: tag.id,
          },
          color: tag.color,
        },
        sys: {
          id: singleTodo.sys.id,
        },
        completed: singleTodo.completed,
      })
    );
    let element = {
      text: text,
      tag: tag,
      id: singleTodo.sys.id,
      completed: singleTodo.completed,
    };

    updateAnEntry(singleTodo.sys.id, element);
    setConfirm(!confirm);
  };

  const handleBack = (e: any) => {
    e.preventDefault();
    dispatch(editTodo(oldState));
    updateAnEntry(singleTodo.sys.id, oldState);
    setText(oldState.text);
    setTag(oldState.tag);
    setConfirm(false);
  };
  if (!loading) {
    return (
      <>
        {!edit ? (
          <li
            onClick={() => handleToggle(singleTodo.sys.id)}
            className={
              singleTodo.completed
                ? `completato edit-mode ${view}`
                : `non_completato ${view}`
            }
          >
            <div
              id="btn-remove-container"
              className="col d-flex align-items-center flex-grow-0"
            ></div>
            <span
              className={
                singleTodo.completed
                  ? `completato  col flex-grow-2 d-flex justify-content-start align-items-center ${view}`
                  : `non_completato col flex-grow-2 d-flex justify-content-start align-items-center ${view}`
              }
            >
              {singleTodo.text}
            </span>
            <div
              id="badge-container"
              className="col-2 flex-grow-0 d-flex align-items-center px-5 justify-content-center flex-grow-0"
            >
              <Badge
                text={singleTodo.tag?.categoryName}
                tag={singleTodo.tag?.categoryName}
                color={singleTodo.tag.color}
              />
            </div>

            <div className="col-auto flex-grow-0 d-flex align-items-center">
              <div
                className={
                  singleTodo.completed ? "completato" : "non_completato"
                }
              >
                {singleTodo.completed ? (
                  <FontAwesomeIcon className={`icon`} icon={faCircleCheck} />
                ) : (
                  <FontAwesomeIcon className={`icon ${view}`} icon={faCircle} />
                )}
              </div>
            </div>
          </li>
        ) : (
          <li
            key={singleTodo.sys.id}
            className={
              singleTodo.completed
                ? `completato edit-mode ${view}`
                : `non_completato ${view}`
            }
          >
            <form className="w-100 d-flex" onSubmit={handleSubmit}>
              <div
                id="btn-remove-container"
                className="col d-flex align-items-center flex-grow-0"
              >
                <ButtonDelete
                  handleRemove={handleRemove}
                  text={"elimina"}
                  id={singleTodo.sys?.id}
                />
              </div>

              {/* insert edit text */}
              <span
                className={
                  singleTodo.completed
                    ? "completato edit-mode col flex-grow-2 d-flex justify-content-start align-items-center"
                    : "non_completato col flex-grow-2 d-flex justify-content-start align-items-center"
                }
              >
                <input
                  className={`input-text w-100 ${view}`}
                  value={text}
                  placeholder={singleTodo.text}
                  type="text"
                  onChange={(e) => handleChangeText(e.target.value)}
                  required
                />
              </span>

              {/* inser edit tag */}
              <div
                id="badge-container"
                className="col-2 flex-grow-0 d-flex align-items-center px-5 justify-content-center flex-grow-0"
              >
                <SelectBadge
                  array={singleTodo}
                  handleChange={handleChangeTag}
                  selectedOption={tag}
                  options={categories}
                />
              </div>

              <div className="col-auto flex-grow-0 d-flex align-items-center">
                <div
                  className={
                    singleTodo.completed
                      ? `completato ${view}`
                      : `non_completato ${view}`
                  }
                ></div>
              </div>

              <div className="col-auto flex-grow-0 d-flex align-items-center">
                {text !== singleTodo?.text ||
                tag.categoryName !== singleTodo?.tag.categoryName ||
                oldState?.text !== singleTodo?.text ||
                oldState?.tag.categoryName !== singleTodo?.tag.categoryName ? (
                  <button className="btn-trasparent">
                    <FontAwesomeIcon
                      onClick={(e) => handleBack(e)}
                      icon={faRotateBack}
                      className={`icon-undo mx-2 ${view}`}
                    />
                  </button>
                ) : (
                  <button className="btn-trasparent">
                    <FontAwesomeIcon
                      icon={faRotateBack}
                      className={"icon-undo mx-2 disabled"}
                    />
                  </button>
                )}

                {tag.categoryName !== singleTodo.tag.categoryName ||
                singleTodo.text !== text ? (
                  <button className="btn-trasparent">
                    <FontAwesomeIcon
                      onClick={(e) => handleSubmit(e)}
                      icon={faCheck}
                      className={`icon-success ${view}`}
                    />
                  </button>
                ) : (
                  <button className="btn-trasparent">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={"icon-success disabled"}
                    />
                  </button>
                )}
              </div>
            </form>
          </li>
        )}
      </>
    );
  } else return <>'caricamento'</>;
};

export default SingleTodo;
