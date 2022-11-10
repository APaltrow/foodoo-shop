import CustomSelect from "../CustomSelect";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderState, setPreOrder } from "../../Redux/Slices/orderSlice";

import style from "./PreOrder.module.scss";
import { useEffect } from "react";

const PreOrder = () => {
  const dispatch = useDispatch();
  const { order } = useSelector(getOrderState);
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
    <div className={style.pre_order}>
      <div className={style.pre_order_section}>
        <b>Pre-order :</b>
        <div className={style.switch} onClick={getPreorder}>
          <div
            className={preorder ? style.switch_btn_active : style.switch_btn}
          ></div>
        </div>
      </div>
      {preorder && (
        <div className={style.pre_order_time}>
          <CustomSelect type={"hours"} getData={showData} />
          <CustomSelect type={"dayPart"} getData={showData} />
          <CustomSelect type={"calendar"} getData={showData} />
        </div>
      )}
      {preorder ? (
        <small className={style.conf}>
          {`Deliver on: ${preorder.calendar} `}
          <br />
          {`Deliver at: ${preorder.hours}:00 ${preorder.dayPart}`}
        </small>
      ) : null}
    </div>
  );
};

export default PreOrder;
