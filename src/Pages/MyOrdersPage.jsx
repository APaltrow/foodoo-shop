import PendingOrderWidget from "../Components/PendingOrderWidget";
import RecentOrders from "../Components/RecentOrders";
import PageLayout from "../layouts/PageLayout";

const MyOrders = () => {
  return (
    <PageLayout img={"orders"} title={"My orders"} type={"list"}>
      <PendingOrderWidget />

      <RecentOrders />
    </PageLayout>
  );
};

export default MyOrders;
