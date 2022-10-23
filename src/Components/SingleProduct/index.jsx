import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import IMG from "../IMG";
import Rating from "../Rating";
import CustomButton from "../CustomButton";
import Loader from "../Loader";
import Sizes from "../Sizes";
import CustomIcon from "../CustomIcon";
import Ingredients from "../Ingredients";
import Reviews from "../Reviews";
import RateProduct from "../RateProduct";

import style from "./SingleProduct.module.scss";

const SingleProduct = () => {
  const navigation = useNavigate();
  const { id } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [singleProduct, setProduct] = useState(false);
  const [activeSize, setActiveSize] = useState([]);
  const [specialOrder, setSpecialOrder] = useState([]);
  const [rateProduct, setRate] = useState(false);

  const getSpecialOrder = (order) => setSpecialOrder(order);
  const onActiveSizeChange = (index) =>
    setActiveSize(singleProduct.sizes[index]);
  const onClickBack = () => navigation(-1);
  const onAddToFavourites = () =>
    alert(`Has been added to Favourites: ${singleProduct.id}`);
  const onRateProduct = () => setRate(!rateProduct);

  const getSingleProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://633577edea0de5318a142d98.mockapi.io/items/${id}`
      );
      setProduct(data);
      setActiveSize(data.sizes[0]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={style.product_container}>
      <div className={style.product_left}>
        <IMG type="big" {...singleProduct} />
        <div> Slider bar</div>
        <Reviews reviews={singleProduct.reviews} />

        <div className={style.btns}>
          <CustomButton icon={"return"} text={"Go Back"} action={onClickBack} />
          <CustomButton icon={"plus"} text={"Add to cart"} />
        </div>
      </div>
      <div className={style.product_right}>
        <h2> {singleProduct.title}</h2>
        <Rating rating={singleProduct.rating} />
        {rateProduct && <RateProduct toggle={onRateProduct} />}
        <div className={style.informers}>
          <CustomIcon
            type={"favourite"}
            icon={"favourites"}
            action={onAddToFavourites}
          />
          <CustomIcon type={"ratings"} icon={"rating"} action={onRateProduct} />
          <CustomIcon type={"attention"} icon={"error"} />
          {singleProduct.isVegitarian && (
            <CustomIcon type={"vegitarian"} icon={"salad"} />
          )}
        </div>
        <p>{singleProduct.description}</p>

        <Sizes
          {...singleProduct}
          activeSize={activeSize}
          action={onActiveSizeChange}
        />

        <Ingredients
          ingredients={singleProduct.ingredients}
          activeSize={activeSize}
          getSpecialOrder={getSpecialOrder}
          specialOrder={specialOrder}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
