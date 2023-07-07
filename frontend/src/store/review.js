import { csrfFetch } from './csrf';


const GET_REVIEW = 'review/getReview';
const POST_REVIEW = 'review/postReview';
const GET_USER_REVIEW = 'reviews/userReview';
const UPDATE_REVIEW = 'reviews/updateReview';
const DELETE_REVIEW = 'reviews/delete';
// ACTION CREATORS
const getReviews = (reviews) => {
    return {
        type: GET_REVIEW,
        reviews
    };
};

export const postReview = (review) => ({
  type: POST_REVIEW,
  review,
});

export const getUserReview = (reviews) => ({
  type: GET_USER_REVIEW ,
  reviews,
});

export const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

export const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review,
});


//THUNK ACTION CREATORS
export const thunkGetReviews = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const spotReviews = await res.json();
    dispatch(getReviews(spotReviews));
    return spotReviews;
  }
};

export const thunkPostReview = (spot, review, user) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const spotReview = await res.json();
    spotReview.User = user;
    dispatch(postReview(spotReview));
    return spotReview;
  } else {
    const errors = await res.json();
    return errors;
  }
};


export const  thunkUserReviews = () => async (dispatch) => {
  const res = await csrfFetch('/api/reviews/current');

  if (res.ok) {
    const userReviews = await res.json();
    dispatch(getUserReview(userReviews));
  }
};


export const thunkUpdateReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(updateReview(updatedReview));
    return updatedReview;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkDeleteReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(deleteReview(review));
    return review;
  } else {
    const errors = await res.json();
    return errors;
  }
};


// INITIAL STATE
const initialState = { spot: {}, user: {} };

// REDUCER
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_REVIEW: {
      const spot = { ...state.spot };

      action.reviews.Reviews.forEach(review => {
        spot[review.id] = review;
      });

      return { ...state, spot };
    }


    case POST_REVIEW: {
      const spot = { ...state.spot };
      spot[action.review.id] = action.review;

      return { ...state, spot };
    }


    case GET_USER_REVIEW: {
      const user = { ...state.user };

      action.reviews.Reviews.forEach(review => {
        user[review.id] = review;
      });

      return { ...state, user };
    }


    case UPDATE_REVIEW: {
      const user = { ...state.user };
      user[action.review.id] = action.review;

      return { ...state, user };
    }


    case DELETE_REVIEW: {
      const spot = { ...state.spot };
      delete spot[action.review.id];

      return { ...state, spot, user: {} };
    }


    default:
      return state;
  }
};

export default reviewReducer;
