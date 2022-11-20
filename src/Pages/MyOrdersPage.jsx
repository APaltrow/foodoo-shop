import { RecentOrders, PendingOrderWidget } from "../Components";

import { PageLayout } from "../layouts";

export const MyOrders = () => {
  return (
    <PageLayout img={"orders"} title={"My orders"} type={"list"}>
      <PendingOrderWidget />

      <RecentOrders />
    </PageLayout>
  );
};
