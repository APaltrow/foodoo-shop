import { useState, FC } from "react";

import {
  getAuthState,
  fetchAddFavourites,
  useAppDispatch,
  useAppSelector,
} from "../../Redux";

import { CustomModal, CustomIcon, CustomButton } from "..";

import { IActiveSize } from "../../@types";

import style from "./AddFavourite.module.scss";

interface AddFavouriteProps {
  imgURL: string;
  id: string;
  title: string;
  specialOrder: string[];
  size: IActiveSize;
}

export const AddFavourite: FC<AddFavouriteProps> = ({
  title,
  specialOrder,
  size,
  imgURL,
  id,
}) => {
  const dispatch = useAppDispatch();

  const { uid } = useAppSelector(getAuthState).user;

  const [favModal, setFavModal] = useState<boolean>(false);

  const onAddToFavourites = () => {
    if (uid) {
      dispatch(
        fetchAddFavourites({
          id,
          uid,
          favourites: { title, specialOrder, size, imgURL, id },
        })
      );
    }
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
