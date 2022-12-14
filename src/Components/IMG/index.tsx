import { FC } from "react";

import { useNavigate } from "react-router-dom";

import style from "./IMG.module.scss";

interface IIMGProps {
  id: string;
  imgURL: string;
  title: string;
  type: string;
}

export const IMG: FC<IIMGProps> = ({ id, imgURL, title, type }) => {
  const navigate = useNavigate();

  const onIMGClick = () => type === "mid" && navigate(`product/${id}`);

  return (
    <div className={style[type]} onClick={onIMGClick}>
      {type === "mid" && <div className={style.hint}> Learn more ...</div>}

      <img src={imgURL} alt={title || `Product img`} />
    </div>
  );
};
