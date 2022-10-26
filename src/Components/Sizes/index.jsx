import React from "react";
import { useState, useEffect } from "react";
import { useDiscount } from "../../Helpers/useDiscount";

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
            <span className={discount && style.actual_price}>
              $ {aSize.price}
            </span>
            {discount && <span>$ {aSize.discountedPrice}</span>}
            <div className={style.price_tick}></div>
          </div>
          {size.size}
        </div>
      ))}
    </div>
  );
};

export default Sizes;
