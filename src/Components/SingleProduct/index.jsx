import React from "react";

import Error from "../Error";
import IMG from "../IMG";
import Rating from "../Rating";
import CustomButton from "../CustomButton";
import DishCardSkeleton from "../DIshCard_Skeleton";
import Sizes from "../Sizes";
import CustomIcon from "../CustomIcon";
import Ingredients from "../Ingredients";
import Reviews from "../Reviews";
import RateProduct from "../RateProduct";
import CustomModal from "../CustomModal";
import AddFavourite from "../AddFovourite";
import Discount from "../Discount";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../Redux/Slices/cartSlice";
import { useGenerateLotID } from "../../Helpers/useGenerateLotID";
import {
  getSingleProductState,
  setActiveSize,
  setSpecialOrder,
  fetchSingleProduct,
} from "../../Redux/Slices/singleProductSlice";

import style from "./SingleProduct.module.scss";

const SingleProduct = () => {
  const { id } = useParams();
  const { lotID } = useGenerateLotID();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);

  const { activeSize, specialOrder, status, error } = useSelector(
    getSingleProductState
  );
  const {
    title,
    rating,
    imgURL,
    description,
    ingredients,
    isVegitarian,
    reviews,
    sizes,
    discount,
  } = useSelector(getSingleProductState).singleProduct;

  const [rateModal, setRateModal] = useState(false);
  const [addFavouriteModal, setaAdFavouriteModal] = useState(false);

  const getSpecialOrder = (order) => dispatch(setSpecialOrder(order));
  const onActiveSizeChange = (sizeActive) =>
    dispatch(setActiveSize(sizeActive));

  const onRateThisProduct = (vis) => {
    setRateModal(vis);
  };
  const onAddToFavourites = (vis) => setaAdFavouriteModal(vis);

  const onAddProduct = () => {
    const item = {
      title,
      id,
      lot_id: lotID(id, activeSize.size, specialOrder),
      imgURL,
      activeSize,
      specialOrder,
      count: 1,
    };
    dispatch(addProducts(item));
  };

  if (status === "error") return <Error error={error} />;
  if (status === "pending") return <DishCardSkeleton type="big" />;
  if (status === "success")
    return (
      <div className={style.product_container}>
        <div className={style.product_left}>
          <IMG type="big" id={id} imgURL={imgURL} title={title} />
          <div> Slider bar</div>
          <Reviews reviews={reviews} />

          <div className={style.btns}>
            <CustomButton type={"goBack"} />
            <CustomButton
              icon={"plus"}
              text={"Add to cart"}
              action={onAddProduct}
            />
          </div>
        </div>
        <div className={style.product_right}>
          <h2> {title}</h2>

          <Rating rating={rating} />

          <div className={style.informers}>
            <CustomIcon
              type={"favourite"}
              icon={"favourites"}
              action={() => onAddToFavourites(true)}
            />
            <CustomIcon
              type={"ratings"}
              icon={"rating"}
              action={() => onRateThisProduct(true)}
            />
            <CustomIcon type={"attention"} icon={"error"} />
            {isVegitarian && <CustomIcon type={"vegitarian"} icon={"salad"} />}
          </div>

          <p>{description}</p>

          <Discount discount={discount} />

          <Sizes
            sizes={sizes}
            activeSize={activeSize}
            discount={discount}
            action={onActiveSizeChange}
          />

          <Ingredients
            ingredients={ingredients}
            activeSize={activeSize}
            getSpecialOrder={getSpecialOrder}
            specialOrder={specialOrder}
          />
          <CustomModal visible={rateModal} handleModal={onRateThisProduct}>
            <RateProduct handleModal={onRateThisProduct} />
          </CustomModal>
          <CustomModal
            visible={addFavouriteModal}
            handleModal={onAddToFavourites}
          >
            <AddFavourite
              size={activeSize}
              title={title}
              specialOrder={specialOrder}
              onAddToFavourites={onAddToFavourites}
            />
          </CustomModal>
        </div>
      </div>
    );
};

export default SingleProduct;
