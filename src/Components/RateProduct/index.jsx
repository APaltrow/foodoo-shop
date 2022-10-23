import style from "./RateProduct.module.scss";
import { generateIcon } from "../Icons/Icons";
import { useState } from "react";
import bad from "../../assets/Bad.png";
import excellent from "../../assets/Excellent.png";
import mid from "../../assets/Mid.png";
import rate from "../../assets/Rate.png";
import CustomButton from "../CustomButton";
import CustomIcon from "../CustomIcon";

const RateProduct = ({ toggle }) => {
  const [rating, setRating] = useState(0);

  const img = () => {
    if (rating === 0) {
      return rate;
    }
    if (rating > 0 && rating < 3) {
      return bad;
    }
    if (rating === 3 || rating === 4) {
      return mid;
    }
    if (rating === 5) {
      return excellent;
    }
  };
  const CTA = () => {
    if (rating === 0) {
      return "Let`s go!";
    }
    if (rating > 0 && rating < 3) {
      return "Has to improve...";
    }
    if (rating === 3 || rating === 4) {
      return "Love it !";
    }
    if (rating === 5) {
      return "Excellent !!!";
    }
  };

  const onRateNow = () => {
    toggle();
  };

  const getRating = (rating) => {
    setRating(rating);
  };
  return (
    <div className={style.rate_wrapper}>
      <div className={style.rate_container}>
        <h3>Rate this product ...</h3>
        <img src={img()} alt="rate" />
        <p>{CTA()}</p>
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
          <input type={"text"} id="comment" placeholder="Comment ..." />
        </label>
        <CustomButton
          icon={"rocket"}
          text={"Rate now"}
          action={onRateNow}
          disabled={rating < 1 && true}
        />
        <div className={style.dismiss}>
          <CustomIcon icon={"dismiss"} type={"small"} action={toggle} />
        </div>
      </div>
    </div>
  );
};

export default RateProduct;
