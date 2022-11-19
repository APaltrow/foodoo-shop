import Settins from "../Components/Settings";
import NotificationToast from "../Components/NotificationToast";
import PageLayout from "../layouts/PageLayout";

const ProfileSettings = () => {
  return (
    <PageLayout img="settings" title="Profile settings" type="list">
      <NotificationToast message="Updated !" type="profile" />
      <Settins />
    </PageLayout>
  );
};

export default ProfileSettings;
