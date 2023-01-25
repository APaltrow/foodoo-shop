import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { SingleProduct, Error, DishCardSkeleton } from "../Components";

import {
  useAppDispatch,
  useAppSelector,
  getSingleProductState,
  fetchSingleProduct,
} from "../Redux";

const ProductPage: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, []);

  const { status, error, singleProduct } = useAppSelector(
    getSingleProductState
  );

  if (status === "error") return <Error error={error} />;
  if (status === "pending") return <DishCardSkeleton type="big" />;
  if (status === "success" || status === "pending-rate") {
    return singleProduct ? (
      <SingleProduct singleProduct={singleProduct} />
    ) : null;
  } else {
    return null;
  }
};
export default ProductPage;
