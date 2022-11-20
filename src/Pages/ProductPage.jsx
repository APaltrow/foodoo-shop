import React from "react";

import { SingleProduct, Error, DishCardSkeleton } from "../Components";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getSingleProductState,
  fetchSingleProduct,
} from "../Redux/Slices/singleProductSlice";

export const ProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);
  const { status, error, singleProduct } = useSelector(getSingleProductState);

  if (status === "error") return <Error error={error} />;
  if (status === "pending") return <DishCardSkeleton type="big" />;
  if (status === "success" || status === "pending-rate") {
    return <SingleProduct singleProduct={singleProduct} />;
  }
};
