import style from "./Settings.module.scss";

import IMG from "../Components/IMG";
import CustomIcon from "../Components/CustomIcon";
import CustomButton from "../Components/CustomButton";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchFavourites,
  getFavouritesState,
} from "../Redux/Slices/favouritesSlice";
import { getAuthState } from "../Redux/Slices/authSlice";
import { useEffect } from "react";

const Favourites = () => {
  const { uid } = useSelector(getAuthState).user;
  const { favourites } = useSelector(getFavouritesState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavourites(uid));
  }, []);

  return (
    <div className={style.favourites}>
      <div> FAVOURITES PAGE</div>
      <div className={style.favourites_container}>
        {favourites.length
          ? favourites.map((favourite, index) => (
              <section key={index} className={style.favourites_item}>
                <IMG
                  id={favourite.id}
                  imgURL={favourite.imgURL}
                  title={favourite.title}
                  type="small"
                />
                <h3> {favourite.title}</h3>
                <span>{favourite.size.size}</span>
                <span>$ {favourite.size.price.toFixed(2)}</span>
                {favourite.specialOrder.length ? (
                  <div className={style.special_order}>
                    <CustomIcon type={"small"} icon={"special-order"} />
                    <ul>
                      {favourite.specialOrder.map((item, i) => (
                        <li>{item} </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div>
                  <CustomIcon type="mid" icon="favourites" />

                  <CustomButton icon={"plus"} type="service" />

                  <CustomButton type="delete" icon={"delete"} />
                </div>
              </section>
            ))
          : null}
      </div>
    </div>
  );
};

export default Favourites;
