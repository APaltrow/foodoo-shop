import { useRef, useEffect, useState } from "react";
import CustomIcon from "../CustomIcon";

import style from "./CustomModal.module.scss";

const CustomModal = ({ children, visible, handleModal }) => {
  const [isOpened, setOpened] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    visible ? setOpened(true) : setOpened(false);
  }, [visible]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(modalRef.current)) {
        setOpened(false);
        handleModal();
      }
    };
    if (visible) {
      document.body.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [isOpened]);

  return (
    isOpened && (
      <div className={style.modal_bg}>
        <div className={style.modal_content} ref={modalRef}>
          {children}

          <div className={style.dismiss}>
            <CustomIcon icon={"dismiss"} type={"small"} action={handleModal} />
          </div>
        </div>
      </div>
    )
  );
};

export default CustomModal;
