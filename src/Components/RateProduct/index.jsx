import { RATING_STATUSES } from "../../constants/RatingStatuses";
import { generateIcon } from "../Icons/Icons";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getSingleProductState,
  fetchRateProduct,
} from "../../Redux/Slices/singleProductSlice";
import { getAuthState } from "../../Redux/Slices/authSlice";
import { useDate } from "../../Hooks/useDate";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";
import CustomIcon from "../CustomIcon";

import style from "./RateProduct.module.scss";

const RateProduct = () => {
  const dispatch = useDispatch();
  const { date, idWithDate } = useDate();
  const { uid, firstname } = useSelector(getAuthState).user;
  const { reviews, id } = useSelector(getSingleProductState).singleProduct;

  const [status, setStatus] = useState(RATING_STATUSES[0]);

  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [rateModal, setRateModal] = useState(false);

  const onRateThisProduct = (vis) => setRateModal(vis);
  const getRatingStatus = () => {
    rating > 0 && rating < 3 && setStatus(RATING_STATUSES[1]);
    rating >= 3 && rating < 5 && setStatus(RATING_STATUSES[2]);
    rating === 5 && setStatus(RATING_STATUSES[3]);
  };
  const onRateNow = () => {
    const rewiews = [
      {
        uid,
        ratingId: idWithDate,
        rating: rating,
        comment: ratingComment,
        commenter: firstname,
        timestamp: date,
      },
      ...reviews,
    ];
    dispatch(fetchRateProduct({ id: id, reviews: rewiews }));
    onRateThisProduct(false);
  };
  const getRatingComment = (e) => {
    setRatingComment(e.target.value);
  };
  const getRating = (rating) => {
    setRating(rating);
  };

  useEffect(() => {
    getRatingStatus();
  }, [rating]);
  useEffect(() => {
    if (!rateModal) {
      setStatus(RATING_STATUSES[0]);
      setRating(0);
      setRatingComment("");
    }
  }, [rateModal]);
  return (
    <>
      <CustomModal visible={rateModal} handleModal={onRateThisProduct}>
        <div className={style.rate_container}>
          <h3>Rate this product </h3>
          <div className={style.rate_content}>
            <img src={status.rating} alt="rate" />
            <p>{status.msg}</p>

            <div className={style.rating}>
              <span
                className={rating === 5 ? style.rated : style.stars}
                onClick={() => getRating(5)}
              >
                {generateIcon("star")}
              </span>
              <span
                className={rating === 4 ? style.rated : style.stars}
                onClick={() => getRating(4)}
              >
                {generateIcon("star")}
              </span>
              <span
                className={rating === 3 ? style.rated : style.stars}
                onClick={() => getRating(3)}
              >
                {generateIcon("star")}
              </span>
              <span
                className={rating === 2 ? style.rated : style.stars}
                onClick={() => getRating(2)}
              >
                {generateIcon("star")}
              </span>
              <span
                className={rating === 1 ? style.rated : style.stars}
                onClick={() => getRating(1)}
              >
                {generateIcon("star")}
              </span>
              <div className={style.cover}>
                {[...new Array(5)].map((_, i) => (
                  <span key={i + 11}>{generateIcon("star")}</span>
                ))}
              </div>
            </div>

            <label htmlFor="comment">
              <input
                onChange={(e) => getRatingComment(e)}
                value={ratingComment}
                type={"text"}
                id="comment"
                placeholder="Leave a comment ..."
                autoComplete="off"
              />
            </label>
          </div>
          <CustomButton
            icon={"rocket"}
            text={"Rate now"}
            action={onRateNow}
            disabled={rating < 1 || !ratingComment ? true : false}
          />
        </div>
      </CustomModal>
      <span className={style.rate_btn}>
        <CustomIcon
          type={"ratings"}
          icon={"rating"}
          action={() => onRateThisProduct(true)}
        />
      </span>
    </>
  );
};

export default RateProduct;
