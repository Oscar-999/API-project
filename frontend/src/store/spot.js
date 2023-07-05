import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT = "spot/getSpot";
const CREATE_SPOT = "spot/createSpot";
const UPDATE_SPOT = "spot/updateSpot";
const DELETE_SPOT = "spot/deleteSpot";

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
  const res = await csrfFetch(`/api/spots/${spotId}`);
  if(res.ok) {
    const spot = await res.json();
    dispatch(getSpot(spot))
    return spot
  }
}
/***************************************************************************************** */
//Initial State
const initialState = {
  allSpots: {},
  oneSpot: {},
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

    default:
      return state;
  }
};
// const spotReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_ALL_SPOTS: {
//       const allSpots = {};
//       action.spots.forEach((spot) => {
//         allSpots[spot.id] = spot;
//       });
//       return {
//         ...state,
//         allSpots
//       };
//     }

//     case GET_SPOT: {
//       const updatedSpotImages = action.spot.SpotImages.map((image, i) => {
//         return state.singleSpot.SpotImages[i] || image;
//       });
//       const updatedSingleSpot = {
//         ...action.spot,
//         SpotImages: updatedSpotImages,
//       };
//       return {
//         ...state,
//         singleSpot: updatedSingleSpot,
//       };
//     }

//     default:
//       return state;
//   }
// };

export default spotReducer;
