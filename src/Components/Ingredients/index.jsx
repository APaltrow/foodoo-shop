import React, { useState } from "react";

import CustomButton from "../CustomButton";
import SpecialOrder from "../SpecialOrder";
import CustomModal from "../CustomModal";
import CustomIcon from "../CustomIcon";

import style from "./Ingredients.module.scss";

const Ingredients = ({
  ingredients,
  activeSize,
  getSpecialOrder,
  specialOrder,
}) => {
  const [isVisibleModal, setModal] = useState(false);

  const handleModal = (vis) => setModal(vis);

  return (
    <section className={style.ingredients}>
      <div className={style.ingredients_header}>
        <h3>Ingredients</h3>
        <CustomIcon icon={"ingredients"} type="small" />
      </div>

      <div>
        {ingredients.map((item, index) => (
          <div className={style.single_ingredient} key={index}>
            <b
              className={
                specialOrder.find((excluded) => excluded === item) &&
                style.excluded
              }
            >
              {item}
            </b>
            <span>
              {Math.ceil(activeSize.weight / (ingredients.length + index))}
              'g
            </span>
          </div>
        ))}

        <div className={style.clips_bot}>
          <span>
            <b>Nutrition:</b> {activeSize.nutrition} `kkal
          </span>
          <span>
            <b>Weight:</b> {activeSize.weight} `g
          </span>
          <CustomButton
            icon={"special-order"}
            text={"special order"}
            action={() => handleModal(true)}
          />
        </div>
      </div>
      <CustomModal visible={isVisibleModal} handleModal={handleModal}>
        <SpecialOrder
          ingredients={ingredients}
          getSpecialOrder={getSpecialOrder}
          specialOrder={specialOrder}
          handleModal={handleModal}
        />
      </CustomModal>
    </section>
  );
};

export default Ingredients;
