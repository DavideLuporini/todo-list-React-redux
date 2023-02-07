import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import SelectTag from "../../features/Todo/SelectTodoItemTag/SelectTodoItemTag";
import ButtonConfirm from "../ButtonConfirm/ButtonConfirm";
import { useState } from "react";
import { addTodo } from "../../features/Todo/todosSlice";
import { createTodoInContentfull } from "../../client/client";

const Modal = ({
  closeModal,
  isOpenModal,
  type,
}: {
  closeModal: any;
  isOpenModal: boolean;
  type: string;
}) => {
  const dispatch = useDispatch();
  const [tag, setTag] = useState<object>({
    sys: {
      id: "2VG7RuhXlEDSuAZOJFbL95",
    },
    categoryName: "nocategory",
  });
  const [input, setInput] = useState<string>("");
  //view mode
  const view = useSelector((state: RootState) => state.app.viewMode);

  function handleChangeTag(tag: any) {
    setTag(tag);
  }
  function handleChangeInput(event: any) {
    setInput(event);
  }

  // function to handle the submit and create the new todo
  const handleSubmit = (e: any) => {
    e.preventDefault();
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
  return (
    <>
      {isOpenModal ? (
        <div id="modal-container" className={`${view}`}>
          <div id={`modal-input`} className={`container ${view}`}>
            <div className="col-12 d-flex justify-content-end"></div>

            <form
              className={`row ${view} flex-grow-1 align-items-between h-100`}
              onSubmit={handleSubmit}
            >
              <div className="col-auto d-flex justify-content-center flex-grow-1">
                <div className=" modal-title">Insert here the new task</div>
              </div>
              <div className="col-auto flex-column flex-grow-1 d-flex align-items-center justify-content-end ">
                <label className="text-start w-100  subtitle-modal">
                  insert text:
                </label>
                <input
                  className="input-text w-100"
                  placeholder="enter text"
                  value={input}
                  type="text"
                  onChange={(e) => handleChangeInput(e.target.value)}
                  required
                />
              </div>
              <div className="col-12  flex-column flex-grow-0 d-flex align-items-start">
                <label className="text-start w-100  subtitle-modal">
                  insert tag:
                </label>
                <SelectTag
                  handleChangeTag={handleChangeTag}
                  tag={tag}
                  singleTodo={""}
                />
              </div>
              <div className="d-flex justify-content-end">
                <ButtonConfirm text={"confirm"} handleSubmit={handleSubmit} />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
