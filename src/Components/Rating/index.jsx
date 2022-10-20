import React from "react";
import { generateIcon } from "../Icons/Icons";

import style from "./Rating.module.scss";

function Rating({ rating }) {
  return (
    <div className={style.rating}>
      {[...new Array(rating)].map((_, i) => (
        <span key={i}>{generateIcon("star")}</span>
      ))}
    </div>
  );
}

export default Rating;
