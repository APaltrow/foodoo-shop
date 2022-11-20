import React from "react";

import { CustomIcon } from "../../Components";

import style from "./Sizes.module.scss";

export const Sizes = ({ sizes, activeSize, action, discount }) => {
  const onActiveSizeChange = (index) => {
    action(sizes[index]);
  };

  return sizes.length > 0 ? (
    <aside className={style.sizes}>
      {sizes.map((size, index) => (
        <button
          key={index}
          onClick={() => onActiveSizeChange(index)}
          className={style.size}
        >
          <div
            className={
              activeSize.price === size.price ? style.price : style.not_visible
            }
          >
            <div className={style.actual_price}>
              {discount
                ? activeSize.discountedPrice.toFixed(2)
                : activeSize.price.toFixed(2)}
            </div>
            {discount && (
              <div className={style.discounted_price}>
                {activeSize.price.toFixed(2)}
              </div>
            )}
            <span>
              <CustomIcon type={"small"} icon={"price"} />
            </span>
          </div>
          {size.size}
        </button>
      ))}
    </aside>
  ) : null;
};
