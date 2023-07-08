import React from 'react';
import SpotImage from '../ImagesSpot/SpotImages';
import SpotInfoHeader from '../SpotInfoHeader/SpotInfoHeader';
import SpotReview from '../SpotReviews/SpotReviews'

const SpotInfoWithReview = ({ spot, newReviewList, userReview, reserve }) => {
  const avgStarRating = spot.avgStarRating.toFixed(1);
  const reviewCount = newReviewList.length;

  return (
    <section>
      <div className='box'>
        <div className='spot-box'>
          <h1>{spot.name}</h1>
          <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
          <SpotImage spot={spot} />
          <SpotInfoHeader spot={spot} reserve={reserve} />
          <h1>★ {avgStarRating} · {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</h1>
          <SpotReview spot={spot} newReviewList={newReviewList} userReview={userReview} />
        </div>
      </div>
    </section>
  );
};

export default SpotInfoWithReview;
