import { csrfFetch } from './csrf';
const GET_ALL_SPOTS = 'spot/getAllSpots';
const GET_SPOT = 'spot/getSpot';
const CREATE_SPOT = 'spot/createSpot';
const UPDATE_SPOT = "spot/updateSpot";
const DELETE_SPOT = "spot/deleteSpot";


/***************************************************************************************** */
// ACTION CREATORS
const getAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  spots
});

const getSpot= (spot) => ({
  type: GET_SPOT,
  spot
})

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot
})

const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot,
  };
};
const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};
/***************************************************************************************** */
// THUNK ACTION CREATORS
export const thunkAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');

  if (res.ok) {
    const { Spots } = await res.json();
    dispatch(getAllSpots(Spots));
    return Spots;
  }
};

export const thunkGetSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spot = await res.json();
    dispatch(getSpot(spot));
    return spot;
  }
}

export const thunkCreateSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(createSpot(spot));
    return spot;
  }
}

export const thunkUpdateSpot = (spot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(spot)
  })

  if (response.ok) {
     const spot = await response.json()
     dispatch(updateSpot(spot))
     return spot
  }
}

export const thunkDeleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
  })

  if (response.ok) {
      dispatch(deleteSpot(spotId))

  }
}
/***************************************************************************************** */
// Initial State
const initialState = {
  allSpots: {},
  singleSpot: { SpotImages: [] }
};
/***************************************************************************************** */
// REDUCER
const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const allSpots = {};
      action.spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      return {
        ...state,
        allSpots
      };
    }

    case GET_SPOT: {
      const updatedSpotImages = action.spot.SpotImages.map((image, i) => {
        return state.singleSpot.SpotImages[i] || image;
      });
      const updatedSingleSpot = {
        ...action.spot,
        SpotImages: updatedSpotImages,
      };
      return {
        ...state,
        singleSpot: updatedSingleSpot,
      };
    }

    case CREATE_SPOT: {
      const singleSpot = { ...action.spot };
      const newState = {
        ...state,
        singleSpot,
        allSpots: {
          ...state.allSpots,
          [action.spot.id]: { ...action.spot }
        }
      };
      return newState;
    }

    default:
      return state;
  }
};

export default spotReducer;
