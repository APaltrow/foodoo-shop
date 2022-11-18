import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getCartState, clearCart } from "../../Redux/Slices/cartSlice";
import { getAuthState } from "../../Redux/Slices/authSlice";
import {
  getCheckoutState,
  setOrder,
  fetchOrder,
  setCancelOrder,
  setStatus,
} from "../../Redux/Slices/checkoutSlice";

import { useDate } from "../../Hooks/useDate";

import CustomButton from "../CustomButton";
import CustomIcon from "../CustomIcon";
import Error from "../Error";
import Loader from "../Loader";
import PreOrder from "../PreOrder";
import PaymentType from "../PaymentType";
import PageLayout from "../../layouts/PageLayout";

import style from "./Checkout.module.scss";

const Checkout = ({ onCancel }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { idWithDate, date } = useDate();
  const { totalCost, products } = useSelector(getCartState);
  const { address, firstname, lastname, phone, id } =
    useSelector(getAuthState).user;
  const { order, status, error } = useSelector(getCheckoutState);

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
        recipient: `${firstname} ${lastname}, tel. ${phone} `,
        deliveryAddress: `${address.city}, ${address.street} ${address["house-number"]}`,
        paymentType: order?.paymentType || "cash",
        ordercheck: getOrder(),
        totalCost,
        orderDate: date,
        paymentStatus: order?.paymentStatus || null,
        orderStatus: order?.orderStatus || "pending",
        preorder: order?.preorder || null,
      })
    );
  }, [totalCost, products, address, firstname, lastname, phone]);
  useEffect(() => {
    if (status === "success") {
      setTimeout(() => {
        navigate("/my-orders");
        dispatch(clearCart());
        dispatch(setCancelOrder());
      }, 1050);
    }

    return () => {
      if (status === "success") {
        dispatch(setStatus());
      }
    };
  }, [status]);

  return (
    <PageLayout img={"wallet"} title={"Checkout"} type={"list"}>
      <div className={style.checkout_container}>
        {error && <Error error={error} />}
        {status === "pending" && <Loader />}

        <div className={style.checkout_content}>
          <div className={style.checkout_item}>
            Recipient :
            <span> {`${firstname} ${lastname}, tel. ${phone} `}</span>
          </div>
          <div className={style.checkout_item}>
            Deliver at :
            {address.city ? (
              <span>{`${address.city}, ${address.street} ${address["house-number"]}`}</span>
            ) : (
              <Error
                error={"Looks like you have not submitted any address yet"}
              />
            )}
          </div>
          <div className={style.checkout_item}>
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

          <div className={style.checkout_item}>
            Total due: <span>$ {totalCost}</span>
          </div>
        </div>

        <div className={style.checkout_buttons}>
          <CustomButton
            text={"cancel"}
            type={"delete"}
            action={onCancelOrder}
          />
          <CustomButton
            text={"submit order"}
            action={onSubmitOrder}
            disabled={
              status === "pending" ||
              (order.paymentType === "card" &&
                order.paymentStatus !== "Payed successfully")
                ? true
                : false
            }
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Checkout;