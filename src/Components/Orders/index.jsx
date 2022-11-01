import CustomIcon from "../CustomIcon";
import NotFound from "../NotFound";
import PendingOrderWidget from "../PendingOrderWidget";

import style from "./Orders.module.scss";

const Orders = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <CustomIcon type={"small"} icon={"orders"} />
        <h3> My orders</h3>
      </div>
      {false && <NotFound />}

      <PendingOrderWidget />

      {false && (
        <ul>
          <li> Orders list</li>
          <li> Orders list</li>
          <li> Orders list</li>
          <li> Orders list</li>
          <li> Orders list</li>
          <li> Orders list</li>
        </ul>
      )}
    </div>
  );
};

export default Orders;
