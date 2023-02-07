import { useDispatch, useSelector } from "react-redux";
import { setCompletedFilter } from "../FilterSlice";
import "./VisibilityFilter.css";
import { RootState } from "../../../app/store";
import RadioButton from "../../../components/RadioButton/RadioButton";
import { useState } from "react";
import { Visibility } from "../Filters";

const VisibilityFilter = () => {
  const dispatch = useDispatch();
  function handleChangeInput(event: any) {
    dispatch(setCompletedFilter(event));
  }

  const [value, setValue] = useState(0);
  //view
  const view = useSelector((state: RootState) => state.app.viewMode);
  //visibility
  const visibility = useSelector(
    (state: RootState) => state.filters.visibility
  );
  return (
    <>
      <div className={`segmented-control ${view}`}>
        <RadioButton
          options={[
            {
              option: Visibility.ALL,
              label: "ALL",
            },
            {
              option: Visibility.DONE,
              label: "TODO",
            },
            {
              option: Visibility.NOT_DONE,
              label: "DONE",
            },
          ]}
          value={visibility}
          onChange={handleChangeInput}
        />
      </div>
    </>
  );
};

export default VisibilityFilter;
