import React from "react";
import CustomButton from "../CustomButton";

import style from "./SpecialOrder.module.scss";

const SpecialOrder = () => {
  return (
    <div className={style.special_modal}>
      <div className={style.special_modal_area}>
        <h3>Special order</h3>
        <label htmlFor="no-meat">
          No meat
          <input type="checkbox" name="no-meat" id="no-meat" />
        </label>
        <label htmlFor="no-sauce">
          No sauce
          <input type="checkbox" name="no-sauce" id="no-sauce" />
        </label>
        <label htmlFor="extra-sauce">
          Extra sauce
          <input type="checkbox" name="extra-sauce" id="extra-sauce" />
        </label>
        <CustomButton text={"apply"} icon={"checkmark"} />
      </div>
    </div>
  );
};

export default SpecialOrder;
