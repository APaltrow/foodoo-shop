import CustomSelect from "../CustomSelect";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getCheckoutState,
  setPreOrder,
} from "../../Redux/Slices/checkoutSlice";

import style from "./PreOrder.module.scss";

const PreOrder = () => {
  const dispatch = useDispatch();
  const { order } = useSelector(getCheckoutState);
  const preorder = order?.preorder;
  const [data, setData] = useState({});

  const getPreorder = () => {
    dispatch(setPreOrder(!preorder));
  };
  const showData = (credentials) => {
    setData((prev) => {
      return { ...prev, [credentials.type]: credentials.credentials };
    });
  };

  useEffect(() => {
    if (preorder) {
      dispatch(setPreOrder(data));
    }
  }, [data]);

  return (
    <section className={style.pre_order}>
      <div className={style.pre_order_header}>
        <h4>Pre-order </h4>
        <button className={style.switch} onClick={getPreorder}>
          <div
            className={preorder ? style.switch_btn_active : style.switch_btn}
          ></div>
        </button>
      </div>
      {preorder && (
        <div className={style.pre_order_time}>
          <div className={style.pre_order_day}>
            <CustomSelect type={"hours"} getData={showData} />
            <CustomSelect type={"dayPart"} getData={showData} />
          </div>
          <CustomSelect type={"calendar"} getData={showData} />
        </div>
      )}
      {preorder ? (
        <small className={style.pre_order_confirmation}>
          {`Deliver on : ${preorder.calendar} `}
          <br />
          {`Deliver at : ${preorder.hours}:00 ${preorder.dayPart}`}
        </small>
      ) : null}
    </section>
  );
};

export default PreOrder;
