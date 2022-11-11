import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getCartState, clearCart } from "../../Redux/Slices/cartSlice";
import { getAuthState } from "../../Redux/Slices/authSlice";
import {
  getOrderState,
  setOrder,
  setStatus,
  setCancelOrder,
  fetchOrder,
} from "../../Redux/Slices/orderSlice";
import { useDate } from "../../Hooks/useDate";

import CustomButton from "../CustomButton";
import CustomIcon from "../CustomIcon";
import checoutimg from "../../assets/checkout.png";
import Error from "../Error";
import Loader from "../Loader";
import NotificationToast from "../NotificationToast";
import PreOrder from "../PreOrder";
import PaymentType from "../PaymentType";

import style from "./Checkout.module.scss";

const Checkout = ({ onCancel }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalCost, products } = useSelector(getCartState);
  const { address, firstname, lastname, phone, id } =
    useSelector(getAuthState).user;

  const { order, status, error } = useSelector(getOrderState);

  const recipient = `${firstname} ${lastname}, ${phone} `;
  const deliveryAddress = `${address.city}, ${address.street} ${address["house-number"]}`;
  const { idWithDate, date } = useDate();

  const getOrder = useCallback(() => {
    const ordercheck = [];
    products.map((product) =>
      ordercheck.push({
        title: product.title,
        count: product.count,
        size: product.activeSize.size,
        price: product.activeSize.discountedPrice
          ? product.activeSize.discountedPrice
          : product.activeSize.price,
        specialOrder: `${[
          ...product.specialOrder.map((item) => `* ${item}  `),
        ]}`,
      })
    );
    return ordercheck;
  }, [products]);

  const onCancelOrder = () => {
    if (window.confirm("Are you sure to cancel the order?")) {
      dispatch(setCancelOrder());
      onCancel(false);
    }
  };
  const onSubmitOrder = () => {
    if (window.confirm("Are you sure to confirm the order?")) {
      dispatch(fetchOrder(order));
    }
  };
  useEffect(() => {
    dispatch(
      setOrder({
        uid: id,
        orderId: idWithDate,
        recipient,
        deliveryAddress,
        paymentType: order?.paymentType || "cash",
        ordercheck: getOrder(),
        totalCost,
        orderDate: date,
        paymentStatus: order?.paymentStatus || false,
        orderStatus: order?.orderStatus || "pending",
        preorder: order?.preorder || false,
      })
    );
  }, [totalCost, products, address, firstname, lastname, phone]);
  useEffect(() => {
    if (status === "success") {
      dispatch(clearCart());
      setTimeout(() => {
        navigate("/my-orders");
      }, 1050);
    }

    return () => {
      dispatch(setStatus());
    };
  }, [status]);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <img src={checoutimg} alt="wallet" />
        <h3>Checkout</h3>
      </div>
      {error && <Error error={error} />}
      {status === "pending" && <Loader />}
      <NotificationToast message={"successfully"} />

      <div className={style.content}>
        <div className={style.item}>
          Recipient :<span> {recipient}</span>
        </div>
        <div className={style.item}>
          Deliver at :{address.city ? <span>{deliveryAddress}</span> : ""}
        </div>
        <div className={style.item}>
          Order check :
          <input type="checkbox" id="order-list" />
          <label htmlFor="order-list">
            <CustomIcon icon="arrow" type="small" />
            <ul>
              {order?.ordercheck
                ? order.ordercheck.map((item, i) => (
                    <li key={i}>
                      {`${item.title}, 
                ${item.size} x${item.count} /                 
                ...$ ${item.price.toFixed(2)} `}
                      {item.specialOrder ? (
                        <span>{item.specialOrder}</span>
                      ) : (
                        ""
                      )}
                    </li>
                  ))
                : null}
            </ul>
          </label>
        </div>
        <PreOrder />

        <PaymentType fname={firstname} lname={lastname} />

        <div className={style.item}>
          Total due: <span>$ {totalCost}</span>
        </div>
      </div>

      <div className={style.btns}>
        <CustomButton text={"cancel"} type={"delete"} action={onCancelOrder} />
        <CustomButton
          text={"submit order"}
          action={onSubmitOrder}
          disabled={status === "pending" ? true : false}
        />
      </div>
    </div>
  );
};

export default Checkout;
