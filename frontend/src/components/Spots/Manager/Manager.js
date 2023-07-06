import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingularTile from "../SingularTile/SingularTile";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import { thunkAllSpots, thunkGetSpot } from "../../../store/spot";
import DeleteModal from "./Delete/DeleteModal";

 const Manager =() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state.spots.allSpots);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkAllSpots());
  }, [dispatch]);

  const spotsArray = Object.values(spots);

  const usersSpotsArray = spotsArray.filter((spot) => {
      return user ? spot.ownerId === user.id : false;
  });

  return (
    <>
      <div>
        <h1>Manage Your Spots</h1>
        {/* <button style={{marginLeft: 34, boxShadow: '4px 4px 5px rgb(151, 150, 150)', cursor:'pointer'}} onClick={(e) => history.push("/spots/new")}>Create a New Spot</button> */}
      </div>
      <div className="spot-tiles">
        {usersSpotsArray.map(({ id, price, city, state, avgRating, previewImage , name}) => {
          return (
            <div key={id} className="manage-tile" style={{ display: "flex", flexDirection: "column" }}>
              <SingularTile
                key={id}
                price={price}
                location={`${city}, ${state}`}
                avgRating={avgRating}
                previewImage={previewImage}
                id={id}
                name={name}
              />
              <div className="update-delete-buttons">
                <button style={{ boxShadow: '4px 4px 5px rgb(151, 150, 150)', cursor:'pointer'}} onClick={e=>{dispatch(thunkGetSpot(id)).then(()=>history.push(`/spots/${id}/edit`))}}>Update</button>
                <p>
                  <OpenModalButton buttonText="Delete" modalComponent={<DeleteModal id={id}/>} />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Manager
