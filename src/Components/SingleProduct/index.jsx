import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProducts } from "../../Redux/Slices/cartSlice";
import { useGenerateLotID } from "../../Helpers/useGenerateLotID";
import { useDiscount } from "../../Helpers/useDiscount";

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

import style from "./SingleProduct.module.scss";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const onClickBack = () => navigation(-1);

  const { id } = useParams();
  const { lotID } = useGenerateLotID();
  const { calculatedActiveSize } = useDiscount();

  const [isLoading, setLoading] = useState(true);
  const [singleProduct, setProduct] = useState(false);
  const [activeSize, setActiveSize] = useState([]);
  const [specialOrder, setSpecialOrder] = useState([]);
  const [rateModal, setRateModal] = useState(false);
  const [addFavouriteModal, setaAdFavouriteModal] = useState(false);

  const getSpecialOrder = (order) => setSpecialOrder(order);
  const onActiveSizeChange = (sizeActive) => setActiveSize(sizeActive);

  const onRateThisProduct = (vis) => setRateModal(vis);
  const onAddToFavourites = (vis) => setaAdFavouriteModal(vis);

  const getSingleProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://633577edea0de5318a142d98.mockapi.io/items/${id}`
      );
      setProduct(data);
      setActiveSize(calculatedActiveSize(data.sizes[0], data.discount));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  //id, title, activePrice, activeSize, specialOrder
  const lot_id = lotID(
    singleProduct.id,
    singleProduct.title,
    activeSize.price,
    activeSize.size,
    specialOrder
  );
  // console.log(lot_id);
  const item = {
    title: singleProduct.title,
    id: singleProduct.id,
    lot_id: lot_id,
    imgURL: singleProduct.imgURL,
    activeSize,
    specialOrder,
    count: 1,
  };
  const onAddProduct = () => {
    // console.log(item);
    dispatch(addProducts(item));
  };

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
          <CustomButton
            icon={"plus"}
            text={"Add to cart"}
            action={onAddProduct}
          />
        </div>
      </div>
      <div className={style.product_right}>
        <h2> {singleProduct.title}</h2>
        <Rating rating={singleProduct.rating} />

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
          {singleProduct.isVegitarian && (
            <CustomIcon type={"vegitarian"} icon={"salad"} />
          )}
        </div>

        <p>{singleProduct.description}</p>

        {singleProduct.discount && (
          <div className={style.discount}>
            <CustomIcon icon={"discount"} type={"discount"} />
            <span>
              Product is on discount
              <strong> - {singleProduct.discount} % </strong>
            </span>
          </div>
        )}

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
        <CustomModal visible={rateModal} handleModal={onRateThisProduct}>
          <RateProduct handleModal={onRateThisProduct} />
        </CustomModal>
        <CustomModal
          visible={addFavouriteModal}
          handleModal={onAddToFavourites}
        >
          <AddFavourite
            size={activeSize}
            title={singleProduct.title}
            specialOrder={specialOrder}
            onAddToFavourites={onAddToFavourites}
          />
        </CustomModal>
      </div>
    </div>
  );
};

export default SingleProduct;
