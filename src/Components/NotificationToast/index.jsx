import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCartState } from "../../Redux/Slices/cartSlice";
import { getAuthState } from "../../Redux/Slices/authSlice";

import CustomIcon from "../CustomIcon";

import style from "./NotificationToast.module.scss";

const NotificationToast = ({ message }) => {
  const { totalCount } = useSelector(getCartState);
  const { address, email, password, firstname, lastname, phone } =
    useSelector(getAuthState).user;

  const [mount, setMount] = useState(false);
  const [toasts, setToasts] = useState([]);

  const handleToast = (id) => {
    setTimeout(() => {
      setToasts((prev) => [...prev.filter((item) => item !== id)]);
    }, 2050);
  };

  useEffect(() => {
    const id = Date.now();
    if (mount) {
      setToasts((prev) => [...prev, id]);
      handleToast(id);
    }
  }, [totalCount, address, email, password, firstname, lastname, phone]);

  useEffect(() => {
    if (!mount) {
      setMount(true);
    }
  }, []);

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
