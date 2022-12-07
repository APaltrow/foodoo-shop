import { useState, useEffect, FC } from "react";

import { CustomSelect } from "..";
import { SelectTypes } from "..";
import { Preorder } from "../../Redux/Slices/checkoutSlice";

import { useAppDispatch, useAppSelector } from "../../Hooks/storeHooks";

import {
  getCheckoutState,
  setPreOrder,
} from "../../Redux/Slices/checkoutSlice";

import style from "./PreOrder.module.scss";

//@ts-ignore
export const PreOrder: FC = () => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector(getCheckoutState);

  const preorder = order?.preorder;
  const [data, setData] = useState<Preorder>({
    hours: null,
    dayPart: null,
    calendar: null,
  });

  const getPreorder = () => {
    if (preorder) {
      dispatch(setPreOrder(null));
    } else {
      dispatch(setPreOrder(data));
    }
  };
  const showData = (type: string, credentials: string | number) => {
    setData((prev) => {
      return { ...prev, [type]: credentials };
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
            <CustomSelect type={SelectTypes.HOURS} getData={showData} />
            <CustomSelect type={SelectTypes.DAYPART} getData={showData} />
          </div>
          <CustomSelect type={SelectTypes.CALENDAR} getData={showData} />
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
