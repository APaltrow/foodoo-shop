import React, { useState, useEffect } from "react";

import { CustomIcon } from "../../Components";

import style from "./ScrollTop.module.scss";

export const ScrollTop = () => {
  const [scrollTop, setScrollTop] = useState(false);

  const scrollUP = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 200 ? setScrollTop(true) : setScrollTop(false);
    });
  }, []);

  return (
    scrollTop && (
      <span className={style.scroll_top}>
        <CustomIcon type={"scroll-top"} icon={"rocket"} action={scrollUP} />
      </span>
    )
  );
};
