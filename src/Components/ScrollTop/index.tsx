import { FC } from "react";

import { CustomIcon } from "..";

import style from "./ScrollTop.module.scss";

export const ScrollTop: FC = () => {
  const scrollUP = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <span className={style.scroll_top}>
      <CustomIcon type={"scroll-top"} icon={"rocket"} action={scrollUP} />
    </span>
  );
};
