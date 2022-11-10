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
                <tr key={order.orderId + i + 1} onClick={() => onViewOrder(i)}>
                  <td>{order.orderDate}</td>
                  <td>{order.orderId}</td>
                  <td>{order.deliveryAddress}</td>
                  <td>{order.paymentType}</td>
                  <td
                    className={
                      order.orderStatus === "pending" ||
                      order.orderStatus === "preorder"
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
          <div
            className={
              viewOrder.orderStatus === "pending" ||
              viewOrder.orderStatus === "preorder"
                ? style.status
                : style.status_done
            }
          >
            <b>Status :</b> {viewOrder.orderStatus}
          </div>
          {viewOrder.preorder ? (
            <div>
              <b>Pre-ordered:</b>
              {` ${viewOrder.preorder.calendar}, ${viewOrder.preorder.hours}:00 ${viewOrder.preorder.dayPart}`}
            </div>
          ) : null}
          <div>
            <b>Date :</b> {viewOrder.orderDate}
          </div>
          <div>
            <b>Order ID :</b> {viewOrder.orderId}
          </div>

          <div>
            <b>Payment :</b> {viewOrder.paymentType}
          </div>

          <div>
            <b>Deliver at :</b> {viewOrder.deliveryAddress}
          </div>
        </div>
        {viewOrder && (
          <ul className={style.check_list}>
            {viewOrder.ordercheck.map((item, i) => (
              <li key={item.title + item.orderId + i}>
                {`${item.title}, ${item.size}, x${
                  item.count
                } ...$${item.price.toFixed(2)} /`}
                <small>{`${item.specialOrder}`}</small>
              </li>
            ))}
            <li>
              <b>Total due :</b> $ {viewOrder.totalCost}
            </li>
          </ul>
        )}
      </CustomModal>
    </div>
  );
};

export default RecentOrders;
