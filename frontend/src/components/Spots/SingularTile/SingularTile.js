import React from "react";
import './SingularTile.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const SingularTile = ({name,id,location, price, avgRating, previewImage}) => {
    const image = previewImage === 'No preview image available' ? (
        <div className="no-preview-image">
               {previewImage}
        </div>
         ) : (
         <img src={previewImage} alt="Spot" />
    )
    return (
        <>
        <NavLink to={`/spots/${id}`} className="spot-tile" key={id}>
          <div className="hover-text">
            <span className="tooltip-text">{name}</span>
          </div>
          {image}
          <div className="location-and-rating">
            <p>{location}</p>
            <div className="star-and-rating">
              <i className="fa-solid fa-star landing-page-star"></i>
              <span>
                {avgRating ? <p>{parseFloat(avgRating).toFixed(1)}</p> : <p>New</p>}
              </span>
            </div>
          </div>
          <p>${price} day</p>
        </NavLink>
      </>
    )
}

export default SingularTile
