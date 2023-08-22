import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkOneSpot } from "../../../store/spots";

import "./CreateBooking.css"
import { createBookingThunk } from "../../../store/booking";

export default function CreateBooking() {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState("");

    useEffect(() => {
        dispatch(thunkOneSpot(spotId));
    }, [dispatch, spotId]);

    const handleSubmit = event => {
        event.preventDefault();
        const newBooking = {
            spotId,
            startDate,
        };
        dispatch(createBookingThunk(newBooking));
        setStartDate("");
    };
    return (
        <>
            <div>
                <h1>Book your spot</h1>
                <div>
                    <div className="book-spot-form">
                        <h2>Your trip</h2>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="start-date">Start date</label>
                            <input
                                id="start-date"
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                            />

                            <button type="submit" className="submit-button">
                                Submit
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}
