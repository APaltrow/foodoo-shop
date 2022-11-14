import CustomIcon from "../CustomIcon";
import Error from "../Error";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeliveredOrder,
  getOrderState,
} from "../../Redux/Slices/orderSlice";

import style from "./PendingOrder.module.scss";

const PendingOrderWidget = () => {
  const dispatch = useDispatch();
  const { pendingOrder } = useSelector(getOrderState);

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (pendingOrder) {
      const count = () => {
        if (timer < 50) {
          setTimer(timer + 1);
        }
      };
      setTimeout(() => {
        count();
      }, 1000);
    }
  }, [timer, pendingOrder]);
  useEffect(() => {
    if (timer === 50) {
      setTimer(0);
      alert("Your order is Delivered!");
      dispatch(
        fetchDeliveredOrder({ ...pendingOrder, orderStatus: "delivered" })
      );
    }
  }, [timer]);

  return (
    <>
      <div className={pendingOrder ? "" : style.non_active}>
        <div className={style.pending_order}>
          <div className={style.slider}>
            <div
              style={{ width: `${timer * 2}%` }}
              className={style.slider_bar}
            ></div>
          </div>
          <div className={timer >= 15 ? style.item_active : style.item}>
            Processing
            <CustomIcon type="order-status" icon="price" />
            <span
              className={timer >= 15 ? style.wrapper_active : style.wrapper}
            ></span>
            {pendingOrder && timer > 0 && timer <= 14 ? (
              <span className={style.spinner}></span>
            ) : null}
            {timer >= 15 && (
              <strong>
                <CustomIcon type="small" icon="checkmark" />
              </strong>
            )}
          </div>
          <div className={timer >= 29 ? style.item_active : style.item}>
            Cooking
            <CustomIcon type="order-status" icon="cooking" />
            <span
              className={timer >= 29 ? style.wrapper_active : style.wrapper}
            ></span>
            {timer < 29 && timer >= 15 ? (
              <span className={style.spinner}></span>
            ) : null}
            {timer >= 29 ? (
              <strong>
                <CustomIcon type="small" icon="checkmark" />
              </strong>
            ) : null}
          </div>
          <div className={timer >= 45 ? style.item_active : style.item}>
            Delivering
            <CustomIcon type="order-status" icon="delivery" />
            <span
              className={timer >= 45 ? style.wrapper_active : style.wrapper}
            ></span>
            {timer < 45 && timer >= 30 ? (
              <span className={style.spinner}></span>
            ) : null}
            {timer >= 45 ? (
              <strong>
                <CustomIcon type="small" icon="checkmark" />
              </strong>
            ) : null}
          </div>
          <div className={style.item}>
            Done !
            <span>
              <CustomIcon type="order-status" icon="orders" />
            </span>
            <span className={style.wrapper}></span>
            {timer > 45 && timer < 50 ? (
              <span className={style.spinner}></span>
            ) : null}
            {timer > 45 ? (
              <strong>
                <CustomIcon type="small" icon="checkmark" />
              </strong>
            ) : null}
          </div>
          {pendingOrder && (
            <>
              {timer < 48 && <p>Order might take up to 30 min ...</p>}
              {timer >= 48 && <p>Order is delivered, enjoy your meal !</p>}
            </>
          )}
        </div>
      </div>
      {!pendingOrder && (
        <div className={style.notification}>
          <Error error={"There are no pending orders..."} />
        </div>
      )}
    </>
  );
};

export default PendingOrderWidget;
