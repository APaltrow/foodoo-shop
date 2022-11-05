import { useEffect } from "react";
import { useState, useRef } from "react";
import CustomIcon from "../CustomIcon";

import style from "./Slider.module.scss";

const Slider = ({ imgURL }) => {
  const ref = useRef();
  const items = [
    { url: imgURL },
    {
      url: "https://images.pexels.com/photos/2180876/pexels-photo-2180876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      url: "https://images.pexels.com/photos/1552642/pexels-photo-1552642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      url: "https://images.pexels.com/photos/8471703/pexels-photo-8471703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      url: "https://images.pexels.com/photos/3731423/pexels-photo-3731423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];
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
      <div className={style.slider_container}>
        <div
          className={style.slider_item}
          ref={ref}
          style={{
            right: `${offset}px`,
          }}
        >
          {items.map((img, i) => (
            <img src={img.url} alt={`img ${i}`} key={i} />
          ))}
        </div>
      </div>
      <div className={style.switch}>
        <div className={style.prev}>
          <CustomIcon
            type="small"
            icon="next"
            action={() => changeActive(active - 1)}
          />
        </div>
        {items.map((item, i) => (
          <span
            key={i + 3}
            className={
              active === i ? style.switch_item_active : style.switch_item
            }
            onClick={() => changeActive(i)}
          ></span>
        ))}
        <div className={style.next}>
          <CustomIcon
            type="small"
            icon="next"
            action={() => changeActive(active + 1)}
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
