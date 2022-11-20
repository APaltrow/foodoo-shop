import { useNotification } from "../../Hooks/useNotification";

import { CustomIcon } from "../../Components";

import style from "./NotificationToast.module.scss";

export const NotificationToast = ({ message, type }) => {
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
