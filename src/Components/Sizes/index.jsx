import React from "react";
import { useState, useEffect } from "react";
import { useDiscount } from "../../Helpers/useDiscount";
import CustomIcon from "../CustomIcon";

import style from "./Sizes.module.scss";

const Sizes = ({ sizes, activeSize, action, discount }) => {
  const { calculatedActiveSize } = useDiscount();
  const [aSize, setASize] = useState(activeSize);

  const onActiveSizeChange = (index) => {
    setASize(() => calculatedActiveSize(sizes[index], discount));
  };

  useEffect(() => {
    action(aSize);
  }, [aSize]);

  return (
    <div className={style.sizes}>
      {sizes.map((size, index) => (
        <div
          key={index}
          onClick={() => onActiveSizeChange(index)}
          className={style.size}
        >
          <div
            className={
              aSize.price === size.price ? style.price : style.not_visible
            }
          >
            <div className={style.actual_price}>
              {discount
                ? aSize.discountedPrice.toFixed(2)
                : aSize.price.toFixed(2)}
            </div>
            {discount && (
              <div className={style.discounted_price}>
                {aSize.price.toFixed(2)}
              </div>
            )}
            <span>
              <CustomIcon type={"small"} icon={"price"} />
            </span>
          </div>
          {size.size}
        </div>
      ))}
    </div>
  );
};

export default Sizes;
