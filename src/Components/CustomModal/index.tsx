import React, { FC } from "react";

import { CustomIcon } from "..";

import style from "./CustomModal.module.scss";

interface CustomModalProps {
  children: React.ReactNode;
  visible: boolean;

  handleModal: (arg: boolean) => void;
}

export const CustomModal: FC<CustomModalProps> = ({
  children,
  visible,

  handleModal,
}) => {
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
