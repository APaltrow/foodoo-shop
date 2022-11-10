import { useNotification } from "../../Hooks/useNotification";

import CustomIcon from "../CustomIcon";

import style from "./NotificationToast.module.scss";

const NotificationToast = ({ message, type }) => {
  const { toasts } = useNotification({ type });

  return toasts.length ? (
    <div className={style.toast_container}>
      {toasts.map((item) => (
        <div className={style.toast} key={item}>
          <CustomIcon icon={"checkmark"} type="small" />
          {message}
        </div>
      ))}
    </div>
  ) : null;
};

export default NotificationToast;
