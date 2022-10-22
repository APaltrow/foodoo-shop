import React from "react";
import { useState, useEffect } from "react";
import CustomIcon from "../CustomIcon";

import style from "./ScrollTop.module.scss";

const ScrollTop = () => {
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

export default ScrollTop;
