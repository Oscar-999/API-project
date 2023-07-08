import React from "react";

const SpotInfoHeader = ({spot, reserve}) => {
    return (
        <div className='reserve-box'>
        <div className='reserve-wrap'>
          <div className='host'>
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <div>{spot.description}</div>
          </div>
        </div>
        <div className="review">
          <div className='reserve'>
            <div className='money'>
              <div>$ {spot.price} night</div>
              <div>★ New</div>
            </div>
            <button onClick={reserve}>Reserve</button>
          </div>
        </div>
      </div>
    );
}

export default SpotInfoHeader
