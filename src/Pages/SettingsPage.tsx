import { FC } from "react";
import { Settins, NotificationToast } from "../Components";

import { PageLayout } from "../layouts";

const ProfileSettings: FC = () => {
  return (
    <PageLayout img="settings" title="Profile settings" type="list">
      <NotificationToast message="Updated !" type="profile" />
      <Settins />
    </PageLayout>
  );
};

export default ProfileSettings;
