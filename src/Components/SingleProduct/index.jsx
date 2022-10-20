import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToggle } from "../../Helpers/useToggle";

import IMG from "../IMG";
import Rating from "../Rating";
import CustomButton from "../CustomButton";
import Loader from "../Loader";
import Sizes from "../Sizes";
import CustomIcon from "../CustomIcon";

import style from "./SingleProduct.module.scss";

const SingleProduct = () => {
  const navigation = useNavigate();
  const [singleProduct, setProduct] = useState(false);
  const [activeSize, setActiveSize] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const [isOpened, setOpened] = useState(true);
  const [isVisible, ref, toggle] = useToggle();

  console.log(isVisible);

  const onActiveSizeChange = (index) =>
    setActiveSize(singleProduct.sizes[index]);
  const toggle1 = () => setOpened(!isOpened);
  const onClickBack = () => navigation(-1);
  const onAddToFavourites = () =>
    alert(`Has been added to Favourites: ${singleProduct.id}`);
  const onRateProduct = () => alert(`Has been Rated: ${singleProduct.id}`);

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
        <div className={style.product_left_something}>
          Something do not know yet
        </div>
        <div className={style.btns}>
          <CustomButton icon={"return"} text={"Go Back"} action={onClickBack} />
          <CustomButton icon={"plus"} text={"Add to cart"} />
        </div>
      </div>
      <div className={style.product_right} ref={ref}>
        <h2> {singleProduct.title}</h2>
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
        <Rating rating={singleProduct.rating} />
        <div>{singleProduct.description}</div>
        {singleProduct && (
          <Sizes
            {...singleProduct}
            activeSize={activeSize}
            action={onActiveSizeChange}
          />
        )}

        <div className={style.ingredients}>
          <div className={style.clips}>
            <h3>Ingredients</h3>
            <CustomIcon type={"small"} icon={"arrow"} action={toggle1} />
          </div>
          {isOpened && (
            <div>
              {singleProduct &&
                singleProduct.ingredients.map((item) => (
                  <div className={style.single_ingredient}> {item}</div>
                ))}
              {singleProduct && (
                <div className={style.clips_bot}>
                  <span>Weight: {activeSize.weight} g</span>
                  <span>Nutrition: {activeSize.nutrition} kkal</span>
                  <CustomButton text={"special order"} action={toggle} />
                </div>
              )}
            </div>
          )}
        </div>

        {isVisible && (
          <div className={style.special_modal}>
            <div className={style.special_modal_area}>
              <h3>Special order</h3>
              <label htmlFor="no-meat">
                No meat
                <input type="checkbox" name="no-meat" id="no-meat" />
              </label>
              <label htmlFor="no-sauce">
                No sauce
                <input type="checkbox" name="no-sauce" id="no-sauce" />
              </label>
              <label htmlFor="extra-sauce">
                Extra sauce
                <input type="checkbox" name="extra-sauce" id="extra-sauce" />
              </label>
              <CustomButton text={"apply"} icon={"checkmark"} />
            </div>
          </div>
        )}
        <div>Feedback comments</div>
        <div>Add discount logic***</div>
      </div>
    </div>
  );
};

export default SingleProduct;
