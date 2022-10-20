import React from "react";
import { generateIcon } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";

import style from "./NotFound.module.scss";

function NotFound({ page }) {
  const navigate = useNavigate();
  const onClickBack = () => navigate("/");
  return (
    <div className={style.not_found}>
      {page && <h2>NOT FOUND</h2>}
      <p>Ooops, nothing has been found...</p>
      <div className={style.not_found_icon}>{generateIcon("not-found")}</div>

      {page && (
        <CustomButton icon={"return"} text={"return"} action={onClickBack} />
      )}
    </div>
  );
}

export default NotFound;
