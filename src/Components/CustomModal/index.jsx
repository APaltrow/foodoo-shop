import { CustomIcon } from "../../Components";

import style from "./CustomModal.module.scss";

export const CustomModal = ({ children, visible, handleModal }) => {
  return (
    <div
      className={visible ? style.modal_active : style.modal_closed}
      onClick={() => handleModal(false)}
    >
      <div
        className={visible ? style.content_active : style.content_closed}
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        <div className={style.dismiss}>
          <CustomIcon
            icon={"dismiss"}
            type={"small"}
            action={() => handleModal(false)}
          />
        </div>
      </div>
    </div>
  );
};
