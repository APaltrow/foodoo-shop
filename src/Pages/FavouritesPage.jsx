import { useEffect } from "react";

import FavouritesItem from "../Components/Favourites_Item";
import NotificationToast from "../Components/NotificationToast";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import PageLayout from "../layouts/PageLayout";
import NotFound from "../Components/NotFound";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchFavourites,
  getFavouritesState,
} from "../Redux/Slices/favouritesSlice";
import { getAuthState } from "../Redux/Slices/authSlice";

const Favourites = () => {
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

export default Favourites;
