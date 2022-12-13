import { FC, memo, useMemo } from "react";

import { generateIcon } from "../Icons/Icons";

import style from "./icon.module.scss";

interface ICustomIcon {
  type: string;
  icon: string;
  action?: () => void;
}

export const CustomIcon: FC<ICustomIcon> = memo(({ type, icon, action }) => {
  const getIcon = useMemo(() => generateIcon(icon), [icon]);
  return (
    <div className={style[type]} onClick={action}>
      {getIcon}
    </div>
  );
});
