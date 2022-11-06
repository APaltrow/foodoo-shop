import { useState } from "react";

import CustomButton from "../CustomButton";
import CustomIcon from "../CustomIcon";
import CustomModal from "../CustomModal";

import style from "./AddFavourite.module.scss";

const AddFavourite = ({ title, specialOrder, size }) => {
  const [favModal, setFavModal] = useState(false);
  const onAddToFavourites = (vis) => setFavModal(vis);
  return (
    <>
      <CustomModal visible={favModal} handleModal={onAddToFavourites}>
        <div className={style.favourite_container}>
          <h3>Add to favourites</h3>
          <div className={style.wrapper}>
            <CustomIcon type={"small"} icon={"favourites"} />
            <p>Are you sure you would like to add ?</p>
            <h3>{title}</h3>
            <p>
              {size.size}, $ {size.price}
            </p>
            <div className={style.special_excluded}>
              {specialOrder.map((item, i) => (
                <span key={i + 33}>{item}</span>
              ))}
            </div>
          </div>
          <CustomButton
            icon={"checkmark"}
            text={"Sure!"}
            action={() => onAddToFavourites(false)}
          />
        </div>
      </CustomModal>

      <span className={style.favourite_btn}>
        <CustomIcon
          type={"favourite"}
          icon={"favourites"}
          action={() => onAddToFavourites(true)}
        />
      </span>
    </>
  );
};

export default AddFavourite;
