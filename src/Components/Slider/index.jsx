import { useEffect } from "react";
import { useState, useRef } from "react";
import { SLIDER_TYPES } from "../../constants/SliderTypes";
import CustomIcon from "../CustomIcon";

import style from "./Slider.module.scss";

const Slider = ({ imgURL, category }) => {
  const ref = useRef();
  const items = [{ url: imgURL }, ...SLIDER_TYPES[category]];
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const changeActive = (img) => {
    img <= items.length - 1 && img >= 0 ? setActive(img) : setActive(0);
  };
  const calculateOffset = () => {
    if (active === 0) {
      setOffset(0);
    }
    if (active === 1) {
      setOffset(ref.current.offsetWidth + 20);
    }
    if (active > 1) {
      setOffset(ref.current.offsetWidth * active + active * 20);
    }
  };

  useEffect(() => {
    calculateOffset();

    window.addEventListener("resize", calculateOffset);

    return () => {
      window.removeEventListener("resize", calculateOffset);
    };
  }, [active]);

  return (
    <>
      <section className={style.slider_container}>
        <div
          className={style.slider_item}
          ref={ref}
          style={{
            transform: `translateX(-${offset}px)`,
          }}
        >
          {items.map((img, i) => (
            <img src={img.url} alt={`img ${i}`} key={i} />
          ))}
        </div>
      </section>
      <aside className={style.switch}>
        <button className={active === 0 ? style.prev_disabled : style.prev}>
          <CustomIcon
            type="small"
            icon="next"
            action={() => changeActive(active - 1)}
          />
        </button>
        {items.map((item, i) => (
          <button
            key={i + 3}
            className={
              active === i ? style.switch_item_active : style.switch_item
            }
            onClick={() => changeActive(i)}
          ></button>
        ))}
        <button className={style.next}>
          <CustomIcon
            type="small"
            icon="next"
            action={() => changeActive(active + 1)}
          />
        </button>
      </aside>
    </>
  );
};

export default Slider;
