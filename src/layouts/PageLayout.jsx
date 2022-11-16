import CustomIcon from "../Components/CustomIcon";

import style from "./Layouts.module.scss";

const PageLayout = ({ children, icon, title, type }) => {
  // type LIST or CATALOG
  return (
    <div className={style.page_wrapper}>
      <div className={style.page_header}>
        <CustomIcon icon={icon} type={"small"} />
        <h3>{title}</h3>
      </div>
      <div className={style[type]}>{children}</div>
    </div>
  );
};

export default PageLayout;
