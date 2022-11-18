import CustomIcon from "../CustomIcon";

import style from "./Discount.module.scss";

const Discount = ({ discount, type }) => {
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

export default Discount;
