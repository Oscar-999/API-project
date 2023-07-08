import React from 'react';
import SpotImage from '../ImagesSpot/SpotImages';
import SpotInfoHeader from '../SpotInfoHeader/SpotInfoHeader';
import OpenModalMenuItem from '../../../Navigation/OpenModalMenuItem';
import CreateReview from '../../../Reviews/CreateReview/CreateReview';
const SpotInfoNoReview = ({ spot, reserve, closeMenu }) => {
  return (
    <section>
      <div className='box'>
        <div className='spot-box'>
          <h1>{spot.name}</h1>
          <div className='info'>{spot.city}, {spot.state}, {spot.country}</div>
          <SpotImage spot={spot} />
          <SpotInfoHeader spot={spot} reserve={reserve} />
          <div className='new-post'>
            <h1>★ New</h1>
            <div className='modal'>
              <OpenModalMenuItem
                buttonText="Post Your Review"
                onItemClick={closeMenu}
                modalComponent={<CreateReview spot={spot} />}
              />
              <h4>Be the first to post a review!</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotInfoNoReview;
