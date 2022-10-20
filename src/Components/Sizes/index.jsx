import React from "react";

import style from "./Sizes.module.scss";

const Sizes = ({ sizes, activeSize, action, discount }) => {
  return (
    <>
      <div className={style.sizes}>
        {sizes.map((size, index) => (
          <span key={index} onClick={() => action(index)}>
            <div
              className={
                activeSize.price === size.price
                  ? style.price
                  : style.not_visible
              }
            >
              $ {activeSize.price}
              <strong className={style.price_tick}></strong>
            </div>
            {size.size}
          </span>
        ))}
      </div>
    </>
  );
};

export default Sizes;
