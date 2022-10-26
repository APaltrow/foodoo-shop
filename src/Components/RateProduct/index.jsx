import { RATING_STATUSES } from "../../constants/RatingStatuses";
import { generateIcon } from "../Icons/Icons";
import { useState, useEffect } from "react";
import CustomButton from "../CustomButton";

import style from "./RateProduct.module.scss";

const RateProduct = ({ handleModal }) => {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState(RATING_STATUSES[0]);

  const getRatingStatus = () => {
    rating > 0 && rating < 3 && setStatus(RATING_STATUSES[1]);
    rating >= 3 && rating < 5 && setStatus(RATING_STATUSES[2]);
    rating === 5 && setStatus(RATING_STATUSES[3]);
  };
  useEffect(() => {
    getRatingStatus();
  }, [rating]);

  const onRateNow = () => {
    handleModal(false);
  };

  const getRating = (rating) => {
    setRating(rating);
  };
  return (
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
            type={"text"}
            id="comment"
            placeholder="Comment ..."
            autoComplete="off"
          />
        </label>
      </div>
      <CustomButton
        icon={"rocket"}
        text={"Rate now"}
        action={onRateNow}
        disabled={rating < 1 && true}
      />
    </div>
  );
};

export default RateProduct;
