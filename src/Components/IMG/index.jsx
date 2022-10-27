import React from "react";
import style from "./IMG.module.scss";

import { useNavigate } from "react-router-dom";

const IMG = ({ id, imgURL, title, type }) => {
  const navigate = useNavigate();
  const onIMGClick = () => type === "mid" && navigate(`product/${id}`);

  return (
    <div className={style[type]} onClick={onIMGClick}>
      {type === "mid" && <div className={style.hint}> Learn more ...</div>}
      <img src={imgURL} alt={title || `Product img`} />
    </div>
  );
};

export default IMG;
