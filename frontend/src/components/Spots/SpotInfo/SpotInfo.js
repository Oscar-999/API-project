import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpot, thunkAllSpots  } from "../../../store/spot";
import { useParams, } from "react-router-dom";
import "./SpotInfo.css";


const SpotInfo = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const oneSpot = useSelector((state) => state.spots.singleSpot);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(thunkGetSpot(spotId));
      await dispatch(thunkAllSpots());
      setIsLoaded(true);
    };

    fetchData();
  }, [dispatch, spotId]);

 console.log(`this is the one spot ${oneSpot}`)
console.log(oneSpot)
  return (
    isLoaded && (
      <>
        <div className="spotId-container">
          <div className="title">
            {oneSpot.name}
            <p className="spotId-location">
              {oneSpot.city}, {oneSpot.state}, {oneSpot.country}
            </p>
          </div>
          <div className="image-container">
          {/* eslint-disable-next-line */}
            <img id='image-cover' src={oneSpot.SpotImages[4].url} />

            <div className="image-grid">
              {oneSpot.SpotImages.slice(0, 4).map((image, index) => (
            // eslint-disable-next-line
                <img
                  key={index}
                  className="each-image"
                  id={
                    index === 0
                      ? "top-left"
                      : index === 1
                        ? "top-right"
                        : index === 2
                          ? "bottom-left"
                          : "bottom-right"
                  }
                  src={image.url}
                  alt={`image-${index}`}
                />
              ))}
            </div>

          </div>
        </div>
        <div className="description-container">
          <div className="Host-description">
            Hosted by {oneSpot.Owner.firstName} {oneSpot.Owner.lastName}
            <p>{oneSpot.description}</p>
          </div>
          <div className="reserving-boxing">
            <div className="pricenstar">
              <div>
                ${oneSpot.price} night
              </div>
              <div>★ {oneSpot.avgStarRating.toFixed(1)} · {oneSpot.numReviews} reviews</div>
            </div>
            <button id="reserve-button">Reserve</button>
          </div>
        </div>
        <div className="reviews-container">
          <div className="reviews-section">
            <div>★ {oneSpot.avgStarRating.toFixed(1)} · {oneSpot.numReviews} reviews</div>
          </div>
         
        </div>
      </>
    )
  );
};

export default SpotInfo;
