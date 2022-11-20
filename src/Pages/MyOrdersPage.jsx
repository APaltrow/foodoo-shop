import { RecentOrders, PendingOrderWidget } from "../Components";

import { PageLayout } from "../layouts";

const MyOrders = () => {
  return (
    <PageLayout img={"orders"} title={"My orders"} type={"list"}>
      <PendingOrderWidget />

      <RecentOrders />
    </PageLayout>
  );
};

export default MyOrders;
