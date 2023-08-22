import {csrfFetch} from './csrf'
/************************************************************************************ */

const CREATE_BOOKING = 'bookings/CREATE_BOOKING'
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING'
const GET_USER_BOOKING ='bookings/GET_USER_BOOKING'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'


const getUserBookings = (bookings) => {

}
export const createBooking = (booking) => ({
    type: CREATE_BOOKING,
    booking,
});


export const createBookingThunk = (spot, booking) => async (dispatch) => {
    try {
        console.log("createBookingThunk: spot", spot)
        console.log("createBookingThunk: spot.id", spot.id)
        console.log("createBookingThunk: booking", booking)

        const res = await csrfFetch(`/api/spots/${spot.id}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking),
        })
        if (res.ok) {
            const newBooking = await res.json()
            console.log("createBookingThunk - Response from API:", newBooking);
            dispatch(createBooking(newBooking))
            return newBooking
        } else {
            const errors = await res.json();
            console.log("createBookingThunk - Error Response from API:", errors);
            return errors;
        }
    } catch (error) {
        console.log("createBookingThunk - Error:", error);
        return error;
    }


}


const initialState = { user: {}, spot: {} };
const bookingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_BOOKING:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } }
            newState.spot[action.booking.id] = action.booking
            return newState
        default:
            return state
    }
}

export default bookingReducer;
