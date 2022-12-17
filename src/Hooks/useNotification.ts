import { useEffect, useState } from "react";

import { getCartState, getAuthState, useAppSelector } from "../Redux";

interface NotificationProps {
  type: string;
}

export const useNotification = ({ type }: NotificationProps) => {
  const { totalCount } = useAppSelector(getCartState);

  const { address, email, password, firstname, lastname, phone } =
    useAppSelector(getAuthState).user;

  const [mount, setMount] = useState<boolean>(false);
  const [toasts, setToasts] = useState<number[]>([]);

  const handleToast = (id: number) => {
    setTimeout(() => {
      setToasts((prev) => [...prev.filter((item) => item !== id)]);
    }, 2050);
  };

  // Toasts for profile

  useEffect(() => {
    if (type === "profile" && mount) {
      const id = Date.now();

      setToasts((prev) => [...prev, id]);
      handleToast(id);
    }
  }, [address, email, password, firstname, lastname, phone]);

  //Toasts for cart

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
