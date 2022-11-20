import React from "react";

import { generateIcon } from "../Icons/Icons";
import { useToggle } from "../../Hooks/useToggle";
import { useSelector, useDispatch } from "react-redux";
import {
  setSortBy,
  setIsASC,
  getSortCategoryState,
} from "../../Redux/Slices/sortCategory";

import { Dropdown } from "../../Components";

import style from "./Sort.module.scss";

export const Sort = () => {
  const dispatch = useDispatch();
  const [isVisible, ref, toggle] = useToggle();

  const { isASC, SORT, sortBy } = useSelector(getSortCategoryState);

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
      <b onClick={toggle} ref={ref}>
        {SORT[sortBy].name}
      </b>
      {isVisible && <Dropdown data={SORT} getId={onSortByChange} />}
    </div>
  );
};
