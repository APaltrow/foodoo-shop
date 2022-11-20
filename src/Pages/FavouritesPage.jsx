import { useEffect } from "react";

import { PageLayout } from "../layouts";
import {
  NotificationToast,
  NotFound,
  Loader,
  FavouritesItem,
  Error,
} from "../Components";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchFavourites,
  getFavouritesState,
} from "../Redux/Slices/favouritesSlice";
import { getAuthState } from "../Redux/Slices/authSlice";

export const Favourites = () => {
  const { uid } = useSelector(getAuthState).user;
  const { favourites, status, error } = useSelector(getFavouritesState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavourites(uid));
  }, []);

  return (
    <>
      <NotificationToast message={"In the cart !"} type={"cart"} />
      <PageLayout
        title={"My Favourites"}
        img={"favourites"}
        type={favourites.length && status === "success" ? "catalog" : "list"}
      >
        {status === "pending" && <Loader />}
        {error && <Error error={error} />}
        {status === "success" &&
          (favourites.length ? (
            favourites.map((favourite, index) => (
              <FavouritesItem favourite={favourite} key={index} />
            ))
          ) : (
            <NotFound />
          ))}
      </PageLayout>
    </>
  );
};
