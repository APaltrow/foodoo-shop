import { useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/storeHooks";

import { CustomModal, CustomIcon, CustomButton } from "..";

import { RATING_STATUSES } from "../../constants/RatingStatuses";
import { generateIcon } from "../Icons/Icons";
import {
  getSingleProductState,
  fetchRateProduct,
} from "../../Redux/Slices/singleProductSlice";
import { getAuthState } from "../../Redux/Slices/authSlice";
import { useDate } from "../../Hooks/useDate";
import { Review } from "../../Redux/Slices/cartSlice";

import style from "./RateProduct.module.scss";

export const RateProduct: FC = () => {
  const dispatch = useAppDispatch();
  const { date, idWithDate } = useDate();
  //@ts-ignore
  const { uid, firstname } = useAppSelector(getAuthState).user;
  //@ts-ignore
  const { reviews, id } = useAppSelector(getSingleProductState).singleProduct;

  const [status, setStatus] = useState(RATING_STATUSES[0]);

  const [rating, setRating] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState<string>("");
  const [rateModal, setRateModal] = useState<boolean>(false);

  const onRateThisProduct = (vis: boolean) => setRateModal(vis);
  const getRatingStatus = () => {
    rating > 0 && rating < 3 && setStatus(RATING_STATUSES[1]);
    rating >= 3 && rating < 5 && setStatus(RATING_STATUSES[2]);
    rating === 5 && setStatus(RATING_STATUSES[3]);
  };
  const onRateNow = () => {
    const rewiews: Review[] = [
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

  const getRatingComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRatingComment(e.target.value);
  };
  const getRating = (rating: number) => {
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
