import { CustomIcon } from "../../Components";

import style from "./Discount.module.scss";

export const Discount = ({ discount, type }) => {
  return discount ? (
    <button className={type ? style[type] : style.discount}>
      <CustomIcon icon={"discount"} type={"discount"} />
      <span>
        {!type && <span>Product is on discount</span>}
        <strong> - {discount}%</strong>
      </span>
    </button>
  ) : null;
};
