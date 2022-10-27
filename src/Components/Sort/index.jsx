import React from "react";
import Dropdown from "../Dropdown";
import { generateIcon } from "../Icons/Icons";
import { useToggle } from "../../Helpers/useToggle";
import { useSelector, useDispatch } from "react-redux";
import {
  setSortBy,
  setIsASC,
  getSortCategoryState,
} from "../../Redux/Slices/sortCategory";

import style from "./Sort.module.scss";

function Sort() {
  const { isASC, sort, sortBy } = useSelector(getSortCategoryState);
  const [isVisible, ref, toggle] = useToggle();

  const dispatch = useDispatch();

  const onOrderChange = () => dispatch(setIsASC(!isASC));
  const onSortByChange = (id) => dispatch(setSortBy(id));

  return (
    <div className={style.root}>
      <label
        className={isASC ? style.selected : style.unselected}
        onClick={onOrderChange}
      >
        {generateIcon("arrow")}
      </label>
      <span> Sort by ... </span>
      <strong onClick={toggle} ref={ref}>
        {sort[sortBy].name}
      </strong>
      {isVisible && <Dropdown data={sort} getId={onSortByChange} />}
    </div>
  );
}

export default Sort;
