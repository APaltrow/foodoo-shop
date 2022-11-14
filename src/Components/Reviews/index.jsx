import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthState } from "../../Redux/Slices/authSlice";
import {
  getSingleProductState,
  fetchRateProduct,
} from "../../Redux/Slices/singleProductSlice";
import CustomIcon from "../CustomIcon";
import CustomButton from "../CustomButton";
import Rating from "../Rating";
import Loader from "../Loader";

import style from "./Reviews.module.scss";

const Reviews = () => {
  const dispatch = useDispatch();

  const { uid } = useSelector(getAuthState).user;
  const { reviews, id } = useSelector(getSingleProductState).singleProduct;
  const { status } = useSelector(getSingleProductState);
  const [editComment, setEditComment] = useState({
    ratingId: null,
    editValue: "",
  });

  const onDeleteComment = (ratingId) => {
    if (window.confirm("Are you sure to delete the comment?")) {
      const updatedRewiews = reviews.filter(
        (review) => review.ratingId !== ratingId
      );

      dispatch(fetchRateProduct({ id: id, reviews: updatedRewiews }));
    }
  };
  const onEditComment = (edit) => {
    setEditComment({
      ratingId: edit.id,
      editValue: edit.value,
    });
  };
  const onConfirmEdit = (ratingId) => {
    if (window.confirm("Are you sure to edit the comment?")) {
      const editedReview = {
        ...reviews.filter((review) => review.ratingId === ratingId)[0],
        comment: editComment.editValue,
      };

      const updatedRewiews = [
        editedReview,
        ...reviews.filter((review) => review.ratingId !== ratingId),
      ];

      dispatch(fetchRateProduct({ id: id, reviews: updatedRewiews }));

      setEditComment({
        ratingId: null,
        editValue: "",
      });
    }
  };

  return (
    <div className={style.reviews}>
      <div className={style.reviews_header}>
        <h3>Reviews</h3>
        <CustomIcon type={"small"} icon="reviews" />
      </div>

      {status === "pending-rate" && <Loader />}
      {reviews.length ? (
        reviews.map((review, index) => (
          <div className={style.reviews_single} key={index}>
            <div className={style.commenter}>
              <CustomIcon type={"small"} icon={"review-profile"} />
              <h5>{review.commenter ? review.commenter : `User`}</h5>
            </div>
            <div className={style.reviews_single_comment}>
              <Rating rating={review.rating} type={"small"} />

              {editComment.ratingId === review.ratingId ? (
                <div className={style.editComment}>
                  <input
                    autoFocus={true}
                    type="text"
                    autoComplete="off"
                    value={editComment.editValue}
                    onChange={(e) => {
                      onEditComment({
                        id: review.ratingId,
                        value: e.target.value,
                      });
                    }}
                  />
                  <span className={style.submitEdit}>
                    <CustomButton
                      type={"service"}
                      text={"apply"}
                      action={() => onConfirmEdit(review.ratingId)}
                    />
                  </span>
                </div>
              ) : (
                <span>{review.comment}</span>
              )}
            </div>
            <span className={style.timestamp}>
              {uid === review.uid ? (
                <>
                  {editComment.ratingId === null ? (
                    <span>
                      <CustomIcon
                        type={"small"}
                        icon={"edit"}
                        action={() =>
                          setEditComment({
                            ratingId: review.ratingId,
                            editValue: review.comment,
                          })
                        }
                      />
                    </span>
                  ) : (
                    <span>
                      <CustomIcon
                        type={"small"}
                        icon={"dismiss"}
                        action={() =>
                          setEditComment({
                            ratingId: null,
                            editValue: "",
                          })
                        }
                      />
                    </span>
                  )}
                  <CustomIcon
                    type={"small"}
                    icon={"delete"}
                    action={() => onDeleteComment(review.ratingId)}
                  />
                </>
              ) : null}
              {review.timestamp ? review.timestamp : `Recently`}
            </span>
          </div>
        ))
      ) : (
        <span>There are no reviews so far ...</span>
      )}
    </div>
  );
};

export default Reviews;
