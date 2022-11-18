import React from "react";

import { generateIcon } from "../Icons/Icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setSortCategory,
  getSortCategoryState,
} from "../../Redux/Slices/sortCategory";

import style from "./NavbarItem.module.scss";

const NavbarItem = () => {
  const { activeCategory, NAVIGATION } = useSelector(getSortCategoryState);
  const dispatch = useDispatch();

  const setActiveCategory = (i) => dispatch(setSortCategory(i));

  return (
    <ul className={style.wrapper}>
      {NAVIGATION.map((item, index) => (
        <li
          key={item.name}
          className={activeCategory === index ? style.item_active : style.item}
          onClick={() => setActiveCategory(index)}
        >
          {generateIcon(item.icon)}
          <span> {item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default NavbarItem;
