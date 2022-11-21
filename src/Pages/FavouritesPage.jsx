import { useEffect } from "react";

import { PageLayout } from "../layouts";
import {
  NotificationToast,
  NotFound,
  FavouritesItem,
  Error,
  PageLoader,
} from "../Components";

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
        {status === "pending" && <PageLoader />}
        {error && <Error error={error} />}
        {status === "success" &&
          (favourites.length ? (
            favourites.map((favourite, index) => (
              <FavouritesItem favourite={favourite} key={index} />
            ))
          ) : (
            <NotFound
              message={
                "Looks like you have not added anything to favourites ..."
              }
            />
          ))}
      </PageLayout>
    </>
  );
};

export default Favourites;
