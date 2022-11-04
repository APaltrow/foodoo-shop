import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthState } from "../../Redux/Slices/authSlice";
import {
  getSingleProductState,
  fetchRateProduct,
} from "../../Redux/Slices/singleProductSlice";
import CustomIcon from "../CustomIcon";
import Rating from "../Rating";

import style from "./Reviews.module.scss";

const Reviews = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector(getAuthState).user;
  const { reviews, id } = useSelector(getSingleProductState).singleProduct;
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
      <h3>Reviews</h3>
      {reviews.length &&
        reviews.map((review, index) => (
          <div className={style.reviews_single} key={index}>
            <div className={style.commenter}>
              <CustomIcon type={"small"} icon={"review-profile"} />
              <h5>{review.commenter ? review.commenter : `User`}</h5>
            </div>
            <div className={style.reviews_single_comment}>
              <Rating rating={review.rating} type={"small"} />

              {editComment.ratingId === review.ratingId ? (
                <>
                  {editComment.editValue ? (
                    <span className={style.submitEdit}>
                      <CustomIcon
                        type={"small"}
                        icon={"checkmark"}
                        action={() => onConfirmEdit(review.ratingId)}
                      />
                    </span>
                  ) : null}
                  <input
                    type="text"
                    autoComplete="off"
                    value={editComment.editValue}
                    onChange={(e) =>
                      onEditComment({
                        id: review.ratingId,
                        value: e.target.value,
                      })
                    }
                  />
                </>
              ) : (
                <span>{review.comment}</span>
              )}
            </div>
            <span className={style.timestamp}>
              {review.timestamp ? review.timestamp : `Recently`}
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
            </span>
          </div>
        ))}
    </div>
  );
};

export default Reviews;
