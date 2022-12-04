import { FC } from "react";
import { CustomIcon } from "../CustomIcon";

import style from "./PageLoader.module.scss";

export const PageLoader: FC = () => {
  return (
    <div className={style.page_loader_wrapper}>
      <CustomIcon icon={"logo"} type={"big"} />
      <div className={style.page_loader_spinner}>
        <CustomIcon icon="burger" type={"small"} />
        <CustomIcon icon="pizza" type={"small"} />
        <CustomIcon icon="drink" type={"small"} />
        <CustomIcon icon="salad" type={"small"} />
      </div>
    </div>
  );
};
