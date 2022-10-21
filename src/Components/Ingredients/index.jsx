import React from "react";
import CustomButton from "../CustomButton";

import SpecialOrder from "../SpecialOrder";

import { useToggle } from "../../Helpers/useToggle";

import style from "./Ingredients.module.scss";

const Ingredients = ({ ingredients, activeSize }) => {
  const [isVisible, ref, toggle] = useToggle();

  return (
    <div className={style.ingredients} ref={ref}>
      <div className={style.clips}>
        <h3>Ingredients</h3>
      </div>
      {
        <div>
          {ingredients.map((item, index) => (
            <div className={style.single_ingredient} key={index}>
              <strong>{item}</strong>
              <span>
                {Math.ceil(activeSize.weight / (ingredients.length + index))}
                'g
              </span>
            </div>
          ))}

          <div className={style.clips_bot}>
            <span>
              <strong>Nutrition:</strong> {activeSize.nutrition} `kkal
            </span>
            <span>
              <strong>Weight:</strong> {activeSize.weight} `g
            </span>

            <CustomButton text={"special order"} action={toggle} />
          </div>
        </div>
      }
      {isVisible && <SpecialOrder />}
    </div>
  );
};

export default Ingredients;
