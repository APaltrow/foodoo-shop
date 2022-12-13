import { FC, useState, memo } from "react";

import {
  getSingleProductState,
  fetchRateProduct,
  getAuthState,
  useAppDispatch,
  useAppSelector,
} from "../../Redux";

import { Rating, Loader, CustomIcon, CustomButton } from "..";

import style from "./Reviews.module.scss";

interface IEditComment {
  ratingId: number | null;
  editValue: string;
}

export const Reviews: FC = memo(() => {
  const dispatch = useAppDispatch();

  const { uid } = useAppSelector(getAuthState).user;
  const { reviews, id } = useAppSelector(getSingleProductState).singleProduct!;

  const { status } = useAppSelector(getSingleProductState);

  const [editComment, setEditComment] = useState<IEditComment>({
    ratingId: null,
    editValue: "",
  });

  const onDeleteComment = (ratingId: number | undefined) => {
    if (window.confirm("Are you sure to delete the comment?")) {
      const updatedRewiews = reviews.filter(
        (review) => review.ratingId !== ratingId
      );

      dispatch(fetchRateProduct({ id: id, reviews: updatedRewiews }));
    }
  };
  const onEditComment = (id: number, value: string) => {
    setEditComment({
      ratingId: id,
      editValue: value,
    });
  };
  const onConfirmEdit = (ratingId: number | undefined) => {
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
    <section className={style.reviews}>
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
                      onEditComment(Number(review.ratingId), e.target.value);
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
                            ratingId: +review.ratingId!,
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
    </section>
  );
});
