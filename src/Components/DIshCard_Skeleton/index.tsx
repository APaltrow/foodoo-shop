import { FC } from "react";

import style from "./Skeleton.module.scss";

interface DishCardSkeletonProps {
  type: string;
}

export const DishCardSkeleton: FC<DishCardSkeletonProps> = ({ type }) => {
  if (type === "big")
    return (
      <div className={style.dishCard_skeleton_big}>
        <div className={style.big_left}>
          <div className={style.big_left_item_1}></div>
          <div className={style.big_left_item_2}>
            <div className={style.big_left_item_2_btns}></div>
            <div className={style.big_left_item_2_btns}></div>
          </div>
        </div>
        <div className={style.big_right}>
          <div className={style.big_right_item}></div>
          <div className={style.big_right_item}></div>
          <div className={style.big_right_item}></div>
          <div className={style.big_right_item}></div>

          <div className={style.big_right_item_bot}></div>
        </div>
      </div>
    );
  if (type === "mid")
    return (
      <div className={style.dishCard_skeleton_mid}>
        <div className={style.image}> </div>

        <div className={style.description}>
          <div className={style.fields}></div>
          <div className={style.fields}></div>
          <div className={style.fields}></div>
          <div className={style.fields}></div>

          <div className={style.btn}></div>
        </div>
      </div>
    );

  return null;
};
