import { FC } from "react";

import { RecentOrders, PendingOrderWidget } from "../Components";
import { PageLayout } from "../layouts";

const MyOrders: FC = () => {
  return (
    <PageLayout img={"orders"} title={"My orders"} type={"list"}>
      <PendingOrderWidget />

      <RecentOrders />
    </PageLayout>
  );
};

export default MyOrders;
