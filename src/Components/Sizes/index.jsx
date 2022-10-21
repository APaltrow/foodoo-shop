import React from "react";

import style from "./Sizes.module.scss";

const Sizes = ({ sizes, activeSize, action, discount }) => {
  return (
    <>
      <div className={style.sizes}>
        {sizes.map((size, index) => (
          <div key={index} onClick={() => action(index)} className={style.size}>
            <div
              className={
                activeSize.price === size.price
                  ? style.price
                  : style.not_visible
              }
            >
              <span className={discount && style.actual_price}>
                $ {activeSize.price}
              </span>
              {discount && (
                <span>
                  $ {activeSize.price - (activeSize.price / 100) * discount}
                </span>
              )}
              <div className={style.price_tick}></div>
            </div>
            {size.size}
          </div>
        ))}
      </div>
    </>
  );
};

export default Sizes;
