import React, { FC } from "react";

import { generateIcon } from "../Icons/Icons";
import { useAppDispatch, useAppSelector } from "../../Hooks/storeHooks";
import {
  setSortCategory,
  getSortCategoryState,
} from "../../Redux/Slices/sortCategory";

import style from "./NavbarItem.module.scss";

export const NavbarItem: FC = () => {
  const { activeCategory, NAVIGATION } = useAppSelector(getSortCategoryState);
  const dispatch = useAppDispatch();

  const setActiveCategory = (index: number) => dispatch(setSortCategory(index));

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
