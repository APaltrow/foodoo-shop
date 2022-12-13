import { FC, memo } from "react";

import { CustomIcon } from "..";

import style from "./Discount.module.scss";

type DiscountProps = {
  discount?: number;
  type?: string;
};

export const Discount: FC<DiscountProps> = memo(({ discount, type }) => {
  return discount ? (
    <button className={type ? style[type] : style.discount}>
      <CustomIcon icon={"discount"} type={"discount"} />
      <span>
        {!type && <span>Product is on discount</span>}
        <strong> - {discount}%</strong>
      </span>
    </button>
  ) : null;
});
