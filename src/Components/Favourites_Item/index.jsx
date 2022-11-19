import IMG from "../IMG";
import CustomButton from "../CustomButton";
import CustomIcon from "../CustomIcon";

import { useProduct } from "../../Hooks/useProduct";
import { useDispatch } from "react-redux";
import { fetchDeleteFavourites } from "../../Redux/Slices/favouritesSlice";
import { useNavigate } from "react-router-dom";

import style from "./FavouritesItem.module.scss";

const FavouritesItem = ({ favourite }) => {
  const navigate = useNavigate(1);
  const dispatch = useDispatch();
  const { id, imgURL, specialOrder, title, size, favId } = favourite;

  const { onAddProduct } = useProduct({
    id,
    imgURL,
    specialOrder,
    title,
    sizes: [size],
    mySpecialOrder: specialOrder,
  });

  const onDeleteFavourite = (favId) => {
    window.confirm("Are you sure to delete this Favourite?") &&
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

export default FavouritesItem;
