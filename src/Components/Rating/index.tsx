import { FC, memo } from "react";

import { generateIcon } from "../Icons/Icons";

import style from "./Rating.module.scss";

interface IRatingProps {
  rating: number;
  type?: string;
}

export const Rating: FC<IRatingProps> = memo(({ rating, type }) => {
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
});
