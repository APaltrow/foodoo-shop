import { useEffect } from "react";
import { useState } from "react";
import CustomIcon from "../CustomIcon";

import style from "./NotificationToast.module.scss";

const NotificationToast = ({ message, listen }) => {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (listen) {
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 500);
    }
  }, [listen]);

  return (
    toast && (
      <div className={style.toast}>
        <CustomIcon icon={"checkmark"} type="small" />
        {message}
      </div>
    )
  );
};

export default NotificationToast;
