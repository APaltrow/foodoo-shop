import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCartState } from "../Redux/Slices/cartSlice";
import { getAuthState } from "../Redux/Slices/authSlice";

export const useNotification = ({ type }) => {
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
    if (type === "profile" && mount) {
      const id = Date.now();

      setToasts((prev) => [...prev, id]);
      handleToast(id);
    }
  }, [address, email, password, firstname, lastname, phone]);
  useEffect(() => {
    if (type === "cart" && mount) {
      const id = Date.now();

      setToasts((prev) => [...prev, id]);
      handleToast(id);
    }
  }, [totalCount]);

  useEffect(() => {
    setMount(true);
  }, []);

  return {
    toasts,
  };
};
