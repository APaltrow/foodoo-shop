import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { CustomIcon } from "..";

import { useCurrentProductCount } from "../../Hooks/useCurrentProductCount";

import style from "./Count.module.scss";

type CountProps = { id: string };

export const Count: FC<CountProps> = ({ id }) => {
  const { productCount } = useCurrentProductCount(id);
  const navigate = useNavigate();

  return productCount ? (
    <div className={style.count} onClick={() => navigate("/cart")}>
      <CustomIcon icon={"cart"} type={"count"} />
      <span> {productCount}</span>
    </div>
  ) : null;
};
