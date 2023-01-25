import { FC, useEffect } from "react";

import {
  getAuthState,
  fetchFavourites,
  getFavouritesState,
  useAppDispatch,
  useAppSelector,
} from "../Redux";

import { PageLayout } from "../layouts";
import {
  NotificationToast,
  NotFound,
  FavouritesItem,
  Error,
  PageLoader,
} from "../Components";

const Favourites: FC = () => {
  const { uid } = useAppSelector(getAuthState).user;
  const { favourites, status, error } = useAppSelector(getFavouritesState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uid) {
      dispatch(fetchFavourites(uid));
    }
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
              <FavouritesItem
                key={favourite.favId || index}
                favourite={favourite}
              />
            ))
          ) : (
            <NotFound message="Looks like you have not added anything to favourites ..." />
          ))}
      </PageLayout>
    </>
  );
};

export default Favourites;
