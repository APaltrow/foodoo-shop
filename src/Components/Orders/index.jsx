import CustomIcon from "../CustomIcon";
import NotFound from "../NotFound";
import PendingOrderWidget from "../PendingOrderWidget";
import RecentOrders from "../RecentOrders";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderState, fetchOrdersList } from "../../Redux/Slices/orderSlice";
import { getAuthState } from "../../Redux/Slices/authSlice";

import style from "./Orders.module.scss";

const Orders = () => {
  const dispatch = useDispatch();
  const { ordersList, order } = useSelector(getOrderState);
  const { id } = useSelector(getAuthState).user;

  useEffect(() => {
    dispatch(fetchOrdersList(id));
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <CustomIcon type={"small"} icon={"orders"} />
        <h3> My orders</h3>
      </div>
      {false && <NotFound />}

      <PendingOrderWidget
        order={order !== undefined && order.orderId ? order : false}
      />

      <RecentOrders ordersList={ordersList} />
    </div>
  );
};

export default Orders;
