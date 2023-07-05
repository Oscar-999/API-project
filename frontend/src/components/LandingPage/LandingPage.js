import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {thunkAllSpots } from "../../store/spot";
import { NavLink } from "react-router-dom";
import './LandingPage.css';

const Spots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const allSpots = Object.values(spots.allSpots);

  useEffect(() => {
    dispatch(thunkAllSpots());
  }, [dispatch]);

  const renderSpots = () =>
    allSpots.map((spot) => (
      <NavLink key={spot.id} to={`/spots/${spot.id}`}>
        <div className="each-spot">
          <img id="spot-image" src={spot.previewImage} alt="img" />
          <div className="review">
            <b>★ {spot.avgRating}</b>
          </div>
          <div className="city">{spot.city}, {spot.state}</div>
          <div className="country">{spot.country}</div>
          <div className="price">
            <b>${spot.price}</b> night
          </div>
        </div>
      </NavLink>
    ));

  return (
    <div className="spots-container">
      {renderSpots()}
    </div>
  );
};

export default Spots;
