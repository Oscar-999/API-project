import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT = "spot/getSpot";
const CREATE_SPOT = "spot/createSpot";
// const UPDATE_SPOT = "spot/updateSpot";
// const DELETE_SPOT = "spot/deleteSpot";

//Actions
const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots
  };
};

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

// const updateSpot = (spot) => {
//   return {
//     type: UPDATE_SPOT,
//     spot,
//   };
// };
// const deleteSpot = (spotId) => {
//   return {
//     type: DELETE_SPOT,
//     spotId,
//   };
// };

/***************************************************************************************** */
// Thunks
export const thunkAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const { Spots } = await response.json();
    dispatch(getAllSpots(Spots));
    return Spots;
  }
};

export const thunkGetSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if(response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot))
    return spot
  }
}

export const thunkCreateSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(createSpot(spot));
    return spot;
  }
}
/***************************************************************************************** */
//Initial State
const initialState = {
  allSpots: {},
  oneSpot: {SpotImages: []},
};
/***************************************************************************************** */
// Reducers
const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      let allSpots = {};
      const newState = { ...state, allSpots };

      action.spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });

      return newState;


      case GET_SPOT: {
        const updatedSpotImages = action.spot.SpotImages.map((image, i) => {
          return state.oneSpot.SpotImages[i] || image;
        });
        const updatedSingleSpot = {
          ...action.spot,
          SpotImages: updatedSpotImages,
        };
        return {
          ...state,
          oneSpot: updatedSingleSpot,
        };
      }

      case CREATE_SPOT: {
        const oneSpot = { ...action.spot };
        const newState = {
          ...state,
          oneSpot,
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
