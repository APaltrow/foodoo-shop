import { Settins, NotificationToast } from "../Components";

import { PageLayout } from "../layouts";

export const ProfileSettings = () => {
  return (
    <PageLayout img="settings" title="Profile settings" type="list">
      <NotificationToast message="Updated !" type="profile" />
      <Settins />
    </PageLayout>
  );
};
