import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../Redux/Slices/cartSlice";
import { useGenerateLotID } from "../../Helpers/useGenerateLotID";
import { useDiscount } from "../../Helpers/useDiscount";
import {
  setSingleProduct,
  getSingleProductState,
  setActiveSize,
  setSpecialOrder,
} from "../../Redux/Slices/singleProductSlice";

import IMG from "../IMG";
import Rating from "../Rating";
import CustomButton from "../CustomButton";
import Loader from "../Loader";
import Sizes from "../Sizes";
import CustomIcon from "../CustomIcon";
import Ingredients from "../Ingredients";
import Reviews from "../Reviews";
import RateProduct from "../RateProduct";
import CustomModal from "../CustomModal";
import AddFavourite from "../AddFovourite";
import Discount from "../Discount";

import style from "./SingleProduct.module.scss";

const SingleProduct = () => {
  const { id } = useParams();
  const { lotID } = useGenerateLotID();
  const { calculatedActiveSize } = useDiscount();
  const dispatch = useDispatch();

  const { activeSize, specialOrder } = useSelector(getSingleProductState);
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
  const [isLoading, setLoading] = useState(true);

  const [rateModal, setRateModal] = useState(false);
  const [addFavouriteModal, setaAdFavouriteModal] = useState(false);

  const getSingleProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://633577edea0de5318a142d98.mockapi.io/items/${id}`
      );
      dispatch(setSingleProduct(data));

      dispatch(
        setActiveSize(calculatedActiveSize(data.sizes[0], data.discount))
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  const getSpecialOrder = (order) => dispatch(setSpecialOrder(order));
  const onActiveSizeChange = (sizeActive) =>
    dispatch(setActiveSize(sizeActive));

  const onRateThisProduct = (vis) => setRateModal(vis);
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

  return isLoading ? (
    <Loader />
  ) : (
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
