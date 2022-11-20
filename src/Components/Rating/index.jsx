import React from "react";

import { generateIcon } from "../Icons/Icons";

import style from "./Rating.module.scss";

export const Rating = ({ rating, type }) => {
  return rating ? (
    <div className={type ? style[type] : style.rating}>
      {[...new Array(rating)].map((_, i) => (
        <span key={i}>{generateIcon("star")}</span>
      ))}
      <div className={style.cover}>
        {[...new Array(5)].map((_, i) => (
          <span key={i + 11}>{generateIcon("star")}</span>
        ))}
      </div>
    </div>
  ) : null;
};
