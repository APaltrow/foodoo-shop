import React from "react";
import CustomIcon from "../CustomIcon";
import Rating from "../Rating";

import style from "./Reviews.module.scss";

const Reviews = ({ reviews }) => {
  return (
    <div className={style.reviews}>
      <h3>Reviews</h3>
      {reviews.map((review, index) => (
        <div className={style.reviews_single} key={index}>
          <CustomIcon type={"small"} icon={"review-profile"} />
          <div className={style.reviews_single_comment}>
            <Rating rating={review.rating} type={"small"} />
            <span>{review.comment}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
