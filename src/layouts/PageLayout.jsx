import { IMG_URL } from "../constants/ImgURL";

import { CustomIcon } from "../Components";

import style from "./Layouts.module.scss";

// type 'catalog' or 'list'

export const PageLayout = ({ children, icon, img, title, type }) => {
  return (
    <div className={style.page_wrapper}>
      <div className={style.page_header}>
        {icon && <CustomIcon icon={icon} type={"small"} />}
        {img && (
          <img src={IMG_URL[img]} alt={img} className={style.page_header_img} />
        )}
        <h3>{title}</h3>
      </div>
      <div className={style[type]}>{children}</div>
    </div>
  );
};
