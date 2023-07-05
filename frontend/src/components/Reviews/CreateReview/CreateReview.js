import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import {  useHistory } from "react-router-dom";
import {   postReviewsThunk } from "../../../store/review";

const CreateReview = ({spotId}) => {
const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const oneSpot = useSelector((state)=> state.spots.oneSpot);
  const {closeModal} = useModal

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [rating, setRating] = useState(1);
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    setValidationError(review.length < 10 ? "Please enter more than 10 characters" : "");
  }, [review]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (review.length >= 10 && stars && user.id !== oneSpot.ownerId) {
      const payload = {
        review,
        stars,
      };

      await dispatch( postReviewsThunk(payload, spotId));
      history.push(`/spots/${spotId}`);
      closeModal();
    }
  };

  const renderStars = () => {
    const starIcons = [];
    for (let i = 1; i <= 5; i++) {
      starIcons.push(
        <div
          key={i}
          className={`fa-sharp ${rating >= i ? "fa-solid" : "fa-regular"} fa-star`}
          onMouseEnter={() => setRating(i)}
          onClick={() => setStars(i)}
        />
      );
    }
    return starIcons;
  };

  return (
    <div className="create-review-modal">
      <h3>How was your stay?</h3>
      <form onSubmit={onSubmit}>
        <label>
          <textarea
            placeholder="Leave your review here..."
            onChange={(e) => setReview(e.target.value)}
            type="text"
            value={review}
          />
        </label>
        {validationError && submitted && <p>{validationError}</p>}
        <div className="stars-review">
          {renderStars()}
          <span>Stars</span>
        </div>
        <button type="submit" id="submit-review-button" disabled={review.length < 10 || !stars}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
};

export default CreateReview
