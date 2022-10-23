import React from "react";
import CustomButton from "../CustomButton";
import SpecialOrder from "../SpecialOrder";

import style from "./Ingredients.module.scss";
import { useState } from "react";

const Ingredients = ({
  ingredients,
  activeSize,
  getSpecialOrder,
  specialOrder,
}) => {
  const [isVisibleModal, setModal] = useState(false);

  const handleModal = () => setModal(!isVisibleModal);

  return (
    <div className={style.ingredients}>
      <div className={style.clips}>
        <h3>Ingredients</h3>
      </div>

      <div>
        {ingredients.map((item, index) => (
          <div className={style.single_ingredient} key={index}>
            <strong
              className={
                specialOrder.find((excluded) => excluded === item) &&
                style.excluded
              }
            >
              {item}
            </strong>
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

          <CustomButton text={"special order"} action={handleModal} />
        </div>
      </div>

      {isVisibleModal && (
        <SpecialOrder
          ingredients={ingredients}
          getSpecialOrder={getSpecialOrder}
          handleModal={handleModal}
          specialOrder={specialOrder}
          isVisibleModal={isVisibleModal}
        />
      )}
    </div>
  );
};

export default Ingredients;
