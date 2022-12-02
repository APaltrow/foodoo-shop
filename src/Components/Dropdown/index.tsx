import React, { FC } from "react";

import { ISort } from "../../constants/Sort";
import { generateIcon } from "../Icons/Icons";

import style from "./Dropdown.module.scss";

interface IDropdownProps {
  data: ISort[];
  getId: () => void;
}

export const Dropdown: FC<IDropdownProps> = ({ data, getId }) => {
  const handleClick = (i) => {
    getId(i.target.id);
  };

  return (
    <ul className={style.root}>
      {data.map((item, index) => (
        <li key={item.name} id={index} onClick={handleClick}>
          {generateIcon(item.icon)}
          {item.name}
        </li>
      ))}
    </ul>
  );
};
