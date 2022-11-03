import Error from "../Error";
import CustomModal from "../CustomModal";

import style from "./RecentOrders.module.scss";
import { useState } from "react";

const RecentOrders = ({ ordersList }) => {
  const [viewOrder, setViewOrder] = useState(false);

  const onViewOrder = (index) => setViewOrder(ordersList[index]);
  const handleModal = (e) => setViewOrder(e);

  return (
    <div className={style.recent_orders}>
      <h3>Recent orders</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Order id</th>
            <th>Delivery address</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {ordersList.length
            ? ordersList.map((order, i) => (
                <tr key={order.orderId} onClick={() => onViewOrder(i)}>
                  <td>{order.orderDate}</td>
                  <td>{order.orderId}</td>
                  <td>{order.deliveryAddress}</td>
                  <td>{order.paymentType}</td>
                  <td
                    className={
                      order.orderStatus === "pending"
                        ? style.status
                        : style.status_done
                    }
                  >
                    {order.orderStatus}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {ordersList.length < 1 && <Error error={"No recent orders found ..."} />}

      <CustomModal visible={viewOrder ? true : false} handleModal={handleModal}>
        <h3>{viewOrder.recipient}</h3>
        <div>
          <div> Deliver at : {viewOrder.deliveryAddress}</div>
          <div> Order ID : {viewOrder.orderId}</div>
          <div> Date : {viewOrder.orderDate}</div>
          <div> Payment : {viewOrder.paymentType}</div>
          <div
            className={
              viewOrder.orderStatus === "pending"
                ? style.status
                : style.status_done
            }
          >
            Status : {viewOrder.orderStatus}
          </div>
        </div>
        {viewOrder && (
          <ul className={style.check_list}>
            {viewOrder.ordercheck.map((item) => (
              <li>
                {`${item.title}, ${item.size}, x${item.count} ...$${item.price} /`}
                <span>{`${item.specialOrder}`}</span>
              </li>
            ))}
          </ul>
        )}
        <div> Total due : ${viewOrder.totalCost}</div>
      </CustomModal>
    </div>
  );
};

export default RecentOrders;
