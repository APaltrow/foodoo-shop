import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getCartState, clearCart } from "../../Redux/Slices/cartSlice";
import { getAuthState } from "../../Redux/Slices/authSlice";
import {
  getOrderState,
  setOrder,
  setCancelOrder,
  fetchOrder,
} from "../../Redux/Slices/orderSlice";

import CustomButton from "../CustomButton";
import CustomIcon from "../CustomIcon";
import checoutimg from "../../assets/checkout.png";
import Error from "../Error";
import Loader from "../Loader";

import style from "./Checkout.module.scss";

const Checkout = ({ onCancel }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalCost, products } = useSelector(getCartState);
  const { address, firstname, lastname, phone, id } =
    useSelector(getAuthState).user;

  const { order, status, error } = useSelector(getOrderState);
  const [paymentType, setPaymentType] = useState("cash");

  const recipient = `${firstname} ${lastname}, ${phone} `;
  const deliveryAddress = `${address.city}, ${address.street} ${address["house-number"]}`;
  const orderId = Date.now();

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

  const onPaymentChange = (type) => {
    setPaymentType(type);
  };
  const onCancelOrder = () => {
    dispatch(setCancelOrder());
    onCancel(false);
  };
  const onSubmitOrder = () => {
    dispatch(fetchOrder(order));
  };
  useEffect(() => {
    dispatch(
      setOrder({
        uid: id,
        orderId,
        recipient,
        deliveryAddress,
        paymentType,
        ordercheck: getOrder(),
        totalCost,
      })
    );
  }, [paymentType, totalCost, products, address, firstname, lastname, phone]);
  useEffect(() => {
    if (status === "success") {
      dispatch(clearCart());
      navigate("/my-orders");
    }
  }, [status]);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <img src={checoutimg} alt="wallet picture" />
        <h3>Checkout</h3>
      </div>
      {error && <Error error={error} />}
      {status === "pending" && <Loader />}

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
            <p>
              <CustomIcon icon="arrow" type="small" />
            </p>
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

        <div className={style.item}>
          Payment :
          <div className={style.payment}>
            <span
              className={paymentType === "cash" ? style.active : ""}
              onClick={() => onPaymentChange("cash")}
            >
              <CustomIcon type="small" icon={"cash"} />
              Cash on delivery
            </span>

            <span
              className={paymentType === "card" ? style.active : ""}
              onClick={() => onPaymentChange("card")}
            >
              <CustomIcon type="small" icon={"card"} />
              Card
            </span>
          </div>
          {paymentType === "card" && <div>Please enter the card details</div>}
        </div>

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
