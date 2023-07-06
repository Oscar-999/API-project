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

const createSpot = (newSpot) => ({
  type: CREATE_SPOT,
  newSpot,
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

//thunk to post to database route for spot table
export const thunkCreateSpot = (spot, imageData) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  //if res.ok, then dispatch the thunk for spotimages table
  if (res.ok) {
    const newSpot = await res.json();
    dispatch(thunkAddImagesToSpot(newSpot, imageData));
    return newSpot;
  } else {
    const errors = await res.json();
    return errors;
  }
};

//thunk to post to database route for spotimages table
export const thunkAddImagesToSpot = (newSpotData, imageData) => async (dispatch) => {
  for (const image of imageData) {
    const res = await csrfFetch(`/api/spots/${newSpotData.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(image),
    });

    if (res.ok) {
      const newImage = await res.json();

      //attach the preview image to the result of the first thunk
      newSpotData.previewImage = newImage.url;

      //dispatch to the action creator
      dispatch(createSpot(newSpotData));

      return newSpotData;
    } else {
      const errors = await res.json();
      return errors;
    }
  }
};

export const thunkDeleteASpot = (spotId) =>async(dispatch) =>{
    const res = await csrfFetch(`/api/spots/${spotId}`,{
       method: 'DELETE'
    });

    if(res.ok){
        dispatch(deleteSpot(spotId))
    }else{
        const errors = await res.json();
        return errors;
    }
}

export const thunkUpdateASpot = (spot, id) =>async(dispatch)=>{
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: "PUT",
        body: JSON.stringify(spot)
    });

    if(res.ok){
        const updatedSpot = await res.json();
        dispatch(updateSpot(updatedSpot));
        return updatedSpot;
    }else{
        const errors = await res.json();
        return errors;
    }
}

/***************************************************************************************** */
// Initial State
const initialState = {
  allSpots: {},
  singleSpot: { }
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
      // const updatedSpotImages = action.spot.SpotImages.map((image, i) => {
      //   return state.singleSpot.SpotImages[i] || image;
      // });
      // const updatedSingleSpot = {
      //   ...action.spot,
      //   SpotImages: updatedSpotImages,
      // };
      // return {
      //   ...state,
      //   singleSpot: updatedSingleSpot,
      // };
      const newSpot = { ...state, singleSpot: {} };
      newSpot.singleSpot = action.spot;

      return newSpot;
    }

    // case CREATE_SPOT: {
    //   const singleSpot = { ...action.spot };
    //   const newState = {
    //     ...state,
    //     singleSpot,
    //     allSpots: {
    //       ...state.allSpots,
    //       [action.spot.id]: { ...action.spot }
    //     }
    //   };
    //   return newState;
    // }

    case CREATE_SPOT:
      const newSpotState = { singleSpot: {}, allSpots: {} };
      //new spot is going in allSpots
      newSpotState.singleSpot = action.newSpot;
      newSpotState.allSpots[action.newSpot.id] = action.newSpot;

      return newSpotState;

    case DELETE_SPOT:
      const currentAllSpots = {...state.allSpots}
      delete currentAllSpots[action.spotId]
      return {...state, allSpots: currentAllSpots}

    case UPDATE_SPOT:
        const currentSingleSpot = {...state, singleSpot:{}};
        currentSingleSpot.singleSpot = action.updatedSpot;

        return currentSingleSpot;
    default:
      return state;

  }
};

export default spotReducer;
