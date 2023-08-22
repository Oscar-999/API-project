import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkOneSpot } from "../../../../store/spots";
import { createBookingThunk, getAllUsersBookingsThunk } from "../../../../store/booking";
import { useHistory } from "react-router-dom";
import "./CreateBooking.css"

export default function CreateBooking() {
    const { spotId } = useParams();
    const history = useHistory()
    const spot = useSelector(state => state.spots.singleSpot);
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(thunkOneSpot(spotId));
    }, [dispatch, spotId]);

    const handleSubmit = async event => {
        event.preventDefault();
        setErrors({});

        const currentDate = new Date().toJSON().slice(0, 10);

        if (startDate < currentDate) {
            setErrors({ startDate: "Cannot book in the past dates" });
            return;
        }

        if (endDate < startDate) {
            setErrors({ endDate: "End date should be after start dates" });
            return;
        }

        const newBooking = {
            spotId,
            startDate,
            endDate,
        };

        try {
            await dispatch(createBookingThunk(spot, newBooking));
            setStartDate("");
            setEndDate("");
            await dispatch(getAllUsersBookingsThunk());
            history.push('/bookings/current');
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
                history.push(`/spots/${spot.id}`);
            }
        }
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
                            {errors.startDate && <div className="errors">{errors.startDate}</div>}

                            <label htmlFor="end-date">End date</label>
                            <input
                                id="end-date"
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                            />
                            {errors.endDate && <div className="errors">{errors.endDate}</div>}

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
