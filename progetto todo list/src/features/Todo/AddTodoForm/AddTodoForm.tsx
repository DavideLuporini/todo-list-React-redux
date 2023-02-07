import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AddTodoForm.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../components/Modal/Modal";
import { RootState } from "../../../app/store";
import SelectTag from "../SelectTodoItemTag/SelectTodoItemTag";
import ButtonConfirm from "../../../components/ButtonConfirm/ButtonConfirm";
import { addTodo } from "../todosSlice";
import { Category } from "../../Filters/Filters";
import { createTodoInContentfull } from "../../../client/client";

export const AddTodoForm = () => {
  const dispatch = useDispatch();
  const [tag, setTag] = useState<object>({
    sys: {
      id: "2VG7RuhXlEDSuAZOJFbL95",
    },
    categoryName: "nocategory",
  });
  const [input, setInput] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  //edit selector
  const edit = useSelector((state: RootState) => state.app.editMode);

  //view mode
  const view = useSelector((state: RootState) => state.app.viewMode);

  // todos
  const currId = useSelector((state: RootState) => state.todo.currentId);

  function handleChangeTag(tag: any) {
    setTag(tag);
  }
  function handleChangeInput(event: any) {
    setInput(event);
  }

  // function to handle the submit and create the new todo
  const handleSubmit = (e: any) => {
    const characters = "66frtrAqmWSowDJzQNDiD";

    function generateString() {
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result;
    }

    let uniqueId = generateString();
    e.preventDefault();
    dispatch(addTodo({ text: input, tag: tag, sys: { id: uniqueId } }));
    let element = {
      text: input,
      tag: tag,
      id: uniqueId,
    };
    createTodoInContentfull(element, uniqueId);
    setInput("");
    setTag({
      sys: {
        id: "2VG7RuhXlEDSuAZOJFbL95",
      },
      categoryName: "nocategory",
    });
  };

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <section className="container" id="input-section">
        <form className={`row ${view}`} id="input-form" onSubmit={handleSubmit}>
          <div className="col-auto d-flex align-items-center">
            <span className="text-input">Insert task</span>
          </div>
          <div className="col-auto flex-grow-1 d-flex justify-content-end">
            <div className="col-auto flex-grow-1 d-flex align-items-center justify-content-end">
              <input
                className="input-text mx-2 w-100"
                placeholder="enter text"
                value={input}
                type="text"
                onChange={(e) => handleChangeInput(e.target.value)}
                required
              />
            </div>
            <div className="col-auto  flex-grow-0 d-flex align-items-center justify-content-between">
              <SelectTag
                handleChangeTag={handleChangeTag}
                tag={tag}
                singleTodo={""}
              />
              <ButtonConfirm text={"add"} handleSubmit={handleSubmit} />
            </div>
          </div>
        </form>
      </section>
      {isOpenModal ? (
        <FontAwesomeIcon
          onClick={() => toggleModal()}
          className={`input-button close ${edit}`}
          icon={faXmark}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => toggleModal()}
          className={`input-button open ${edit}`}
          icon={faPlus}
        />
      )}
      <div className={`blur ${view}`}></div>
      <Modal
        type={"add-todo"}
        closeModal={toggleModal}
        isOpenModal={isOpenModal}
      />
    </>
  );
};

export default AddTodoForm;
