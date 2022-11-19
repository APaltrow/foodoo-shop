import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddFavourites } from "../../Redux/Slices/favouritesSlice";
import { getAuthState } from "../../Redux/Slices/authSlice";

import CustomButton from "../CustomButton";
import CustomIcon from "../CustomIcon";
import CustomModal from "../CustomModal";

import style from "./AddFavourite.module.scss";

const AddFavourite = ({ title, specialOrder, size, imgURL, id }) => {
  const dispatch = useDispatch();

  const { uid } = useSelector(getAuthState).user;
  const [favModal, setFavModal] = useState(false);

  const onAddToFavourites = () => {
    dispatch(
      fetchAddFavourites({
        uid,
        favourites: { title, specialOrder, size, imgURL, id },
      })
    );
    setFavModal(false);
  };
  return (
    <>
      <CustomModal visible={favModal} handleModal={setFavModal}>
        <section className={style.favourite_container}>
          <h3>Add to favourites</h3>
          <div className={style.wrapper}>
            <CustomIcon type={"small"} icon={"favourites"} />
            <p>Are you sure you would like to add ?</p>
            <h3>{title}</h3>
            <p>
              {size.size}, $ {size.price.toFixed(2)}
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
            action={onAddToFavourites}
          />
        </section>
      </CustomModal>

      <span className={style.favourite_button}>
        <CustomIcon
          type={"favourite"}
          icon={"favourites"}
          action={() => setFavModal(true)}
        />
      </span>
    </>
  );
};

export default AddFavourite;
