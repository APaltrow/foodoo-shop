import React from "react";
import { generateIcon } from "../Icons/Icons";

import style from "./Rating.module.scss";

function Rating({ rating, type }) {
  return (
    <div className={type ? style[type] : style.rating}>
      {[...new Array(rating)].map((_, i) => (
        <span key={i}>{generateIcon("star")}</span>
      ))}
    </div>
  );
}

export default Rating;
