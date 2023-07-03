import React, { useEffect } from "react";
import "./AllTiles.css";
import SingularTile from "../SingularTile/SingularTile";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllSpots } from "../../../store/spot";

const AllTiles = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(thunkAllSpots());
  }, [dispatch]);

  const arraySpots = Object.values(spots);

  return (
    <div className="spot-tiles">
      {arraySpots.map(({ id, price, city, state, avgRating, previewImage, name }) => (
        <SingularTile
          key={id}
          price={price}
          location={`${city}, ${state}`}
          avgRating={avgRating}
          previewImage={previewImage}
          id={id}
          name={name}
        />
      ))}
    </div>
  );
};

export default AllTiles;
