import React from "react";

import style from "./Skeleton.module.scss";

function DishCardSkeleton() {
  return (
    <div className={style.dish_card_skeleton}>
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
}

export default DishCardSkeleton;
