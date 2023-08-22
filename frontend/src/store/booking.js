import { csrfFetch } from './csrf';

const CREATE_BOOKING = 'bookings/CREATE_BOOKING';
const UPDATE_BOOKING = 'bookings/UPDATE_BOOKING';
const GET_USER_BOOKING = 'bookings/GET_USER_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING';

const getUserBookings = (bookings) => ({
    type: GET_USER_BOOKING,
    bookings,
});

const createBooking = (booking) => ({
    type: CREATE_BOOKING,
    booking,
});

const updateBooking = (booking) => ({
    type: UPDATE_BOOKING,
    booking,
});

const deleteBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId,
});

export const createBookingThunk = (spot, booking) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spot.id}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking),
        });

        if (res.ok) {
            const newBooking = await res.json();
            dispatch(createBooking(newBooking));
            return newBooking;
        } else {
            const errors = await res.json();
            return errors;
        }
    } catch (error) {
        console.error("createBookingThunk - Error:", error);
        return error;
    }
};

export const getUserBookingsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/bookings/current');

        if (res.ok) {
            const userBookings = await res.json();
            dispatch(getUserBookings(userBookings));
        }
    } catch (error) {
        console.error("getUserBookingsThunk - Error:", error);
    }
};

export const updateBookingThunk = (booking, spot) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/bookings/${booking.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking),
        });

        if (response.ok) {
            const updatedBooking = await response.json();
            updatedBooking.Spot = spot;
            dispatch(updateBooking(updatedBooking));
            return updatedBooking;
        } else {
            const errors = await response.json();
            return errors;
        }
    } catch (error) {
        console.error("updateBookingThunk - Error:", error);
        return error;
    }
};

export const deleteBookingThunk = (booking) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/bookings/${booking.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch(deleteBooking(booking.id));
            return booking;
        } else {
            const errors = await response.json();
            return errors;
        }
    } catch (error) {
        console.error("deleteBookingThunk - Error:", error);
        return error;
    }
};

const initialState = { user: {}, spot: {} };

const bookingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_BOOKING:
            newState = {
                ...state,
                user: { ...state.user },
                spot: { ...state.spot },
            };
            newState.spot[action.booking.id] = action.booking;
            return newState;

        case UPDATE_BOOKING:
            newState = {
                ...state,
                user: {
                    ...state.user,
                    [action.booking.id]: action.booking,
                },
            };
            return newState;

        case GET_USER_BOOKING:
            newState = {
                ...state,
                user: {
                    ...state.user,
                    ...action.bookings,
                },
            };
            return newState;

        case DELETE_BOOKING:
            const { [action.bookingId]: deletedBooking, ...remainingUserBookings } =
                state.user;
            newState = {
                ...state,
                user: remainingUserBookings,
            };
            return newState;

        default:
            return state;
    }
};

export default bookingReducer;
