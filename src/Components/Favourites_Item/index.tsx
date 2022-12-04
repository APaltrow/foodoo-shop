import { FC } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useProduct } from "../../Hooks/useProduct";
import { fetchDeleteFavourites } from "../../Redux/Slices/favouritesSlice";
import { IActiveSizeWithDiscount } from "../../Hooks/useDiscount";

import { IMG, CustomIcon, CustomButton } from "..";

import style from "./FavouritesItem.module.scss";

interface FavouritesItemProps {
  favourite: {
    id: string;
    imgURL: string;
    specialOrder: string[] | [];
    title: string;
    size: IActiveSizeWithDiscount;
    favId: string;
  };
}

export const FavouritesItem: FC<FavouritesItemProps> = ({ favourite }) => {
  const navigate = useNavigate(1);
  const dispatch = useDispatch();
  const { id, imgURL, specialOrder, title, size, favId } = favourite;

  const { onAddProduct } = useProduct({
    id,
    imgURL,
    title,
    sizes: [size],
    mySpecialOrder: specialOrder,
  });

  const onDeleteFavourite = (favId) => {
    window.confirm("Are you sure to delete this Favourite?") &&
      //@ts-ignore
      dispatch(fetchDeleteFavourites(favId));
  };

  return (
    <section className={style.favourites_item}>
      <IMG id={id} imgURL={imgURL} title={title} type="small" />
      <div className={style.description}>
        <h3>{title}</h3>
        <span>{size.size}</span>
        <span>$ {size.price.toFixed(2)}</span>
      </div>

      {specialOrder.length ? (
        <div className={style.special_order}>
          <span className={style.special_order_icon}>
            <CustomIcon type={"small"} icon={"special-order"} />
          </span>

          <ul>
            {specialOrder.map((item, i) => (
              <li key={i}>{item} </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={style.favourites_buttons}>
        <CustomIcon
          type="mid"
          icon="favourites"
          action={() => navigate(`/product/${id}`)}
        />

        <CustomButton icon={"plus"} type="service" action={onAddProduct} />

        <CustomButton
          type="delete"
          icon={"delete"}
          action={() => onDeleteFavourite(favId)}
        />
      </div>
    </section>
  );
};
