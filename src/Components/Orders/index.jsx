import PendingOrderWidget from "../PendingOrderWidget";
import RecentOrders from "../RecentOrders";
import PageLayout from "../../layouts/PageLayout";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderState, fetchOrdersList } from "../../Redux/Slices/orderSlice";
import { getAuthState } from "../../Redux/Slices/authSlice";

import style from "./Orders.module.scss";

const Orders = () => {
  const dispatch = useDispatch();
  const { ordersList } = useSelector(getOrderState);
  const { id } = useSelector(getAuthState).user;

  useEffect(() => {
    dispatch(fetchOrdersList(id));
  }, []);

  return (
    <PageLayout img={"orders"} title={"My orders"} type={"list"}>
      <PendingOrderWidget />

      <RecentOrders ordersList={ordersList} />
    </PageLayout>
  );
};

export default Orders;
