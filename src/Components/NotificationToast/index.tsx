import { FC } from "react";

import { useNotification } from "../../Hooks/useNotification";

import { CustomIcon } from "..";

import style from "./NotificationToast.module.scss";

interface ToastProps {
  message: string;
  type: string;
}

export const NotificationToast: FC<ToastProps> = ({ message, type }) => {
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
