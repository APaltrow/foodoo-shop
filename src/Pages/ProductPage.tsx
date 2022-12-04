import React, { FC, useEffect } from "react";

import { SingleProduct, Error, DishCardSkeleton } from "../Components";

import { useParams } from "react-router-dom";
import {
  getSingleProductState,
  fetchSingleProduct,
} from "../Redux/Slices/singleProductSlice";
import { useAppDispatch, useAppSelector } from "../Hooks/storeHooks";

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
    return <SingleProduct singleProduct={singleProduct} />;
  } else {
    return null;
  }
};
export default ProductPage;
