import React from "react";

import { generateIcon } from "../Icons/Icons";

import style from "./Dropdown.module.scss";

export const Dropdown = ({ data, getId }) => {
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
