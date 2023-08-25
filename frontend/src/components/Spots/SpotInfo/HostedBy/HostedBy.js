import React from 'react';
import './HostedBy.css';

const HostedBy = ({ spot, userId,  }) => {
    return (
        <div className="hosted-by-container">
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
            <div className="hosted-by-row">
                <div className="hosted-by-info">
                    <p className="hosted-by-label"> <i class="fa-solid fa-star"></i>{spot.avgStarRating} Reviews</p>
                    <p className="hosted-by-label"> <i class="fa-solid fa-user-shield"></i>Identity verified</p>
                    <p className="hosted-by-label"> <i class="fa-solid fa-crown"></i>Superhost</p>
                </div>
            </div>

            <div className="hosted-by-col">
                <p className="hosted-by-description">
                    Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
                </p>
                <p className="hosted-by-info">Response rate: 100%</p>
                <p className="hosted-by-info">Response time: within an hour</p>
            </div>
        </div>
    );
};

export default HostedBy;
