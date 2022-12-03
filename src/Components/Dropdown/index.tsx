import React, { FC } from "react";

import { ISort } from "../../constants/Sort";
import { generateIcon } from "../Icons/Icons";

import style from "./Dropdown.module.scss";

interface DropdownProps {
  data: ISort[];
  getId: (index: number) => void;
}

export const Dropdown: FC<DropdownProps> = ({ data, getId }) => {
  return (
    <ul className={style.root}>
      {data.map((item, index) => (
        <li key={item.name} onClick={() => getId(index)}>
          {generateIcon(item.icon)}
          {item.name}
        </li>
      ))}
    </ul>
  );
};
