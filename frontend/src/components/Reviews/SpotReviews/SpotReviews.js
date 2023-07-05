import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetReviews } from "../../../store/review";
import OpenModalButton from "../../OpenModalButton";
import CreateReview from "../CreateReview/CreateReview";

const SpotReviews = ({ spotId }) => {
  const review = useSelector((state) => state.reviews.spot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetReviews(spotId));
  }, [dispatch, spotId]);

  return (
    <>
      <div>
        <OpenModalButton
          buttonText="Post Your Review"
          modalComponent={<CreateReview spotId={spotId} />}
        />
      </div>

      <div className="reviews-list">
        {Object.values(review).map(({ id, User: { firstName }, review }) => [
          <h3 className="reviewUser-name" key={`${id}-name`}>
            {firstName}
          </h3>,
          <h4 key={`${id}-date`}>July 2020</h4>,
          <p key={`${id}-review`}>{review}</p>,
        ])}
      </div>
    </>
  );
};

export default SpotReviews;
