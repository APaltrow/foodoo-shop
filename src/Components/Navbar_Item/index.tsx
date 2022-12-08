import { FC } from "react";

import { generateIcon } from "../Icons/Icons";

import {
  useAppDispatch,
  useAppSelector,
  setSortCategory,
  getSortCategoryState,
} from "../../Redux";

import style from "./NavbarItem.module.scss";

export const NavbarItem: FC = () => {
  const dispatch = useAppDispatch();

  const { activeCategory, NAVIGATION } = useAppSelector(getSortCategoryState);

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
