import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/Navigation";
import { Route } from "react-router-dom";
import CreateBooking from "./components/Bookings/Create/CreateBooking";
import ManageSpots from "./components/Spots/ManageSpots/ManageSpots";
import EditSpot from "./components/Spots/ManageSpots/EditSpot/EditSpot";
import ManageReviews from "./components/Reviews/ManageReviews/EditReview";
import CreateSpot from "./components/Spots/ManageSpots/CreateSpot/CreateSpot";
import LandingPage from "./components/LandingPage/LandingPage";
import SpotInfo from "./components/Spots/SpotInfo/SpotInfo";
import ManageBooking from "./components/Bookings/Manager/ManageBooking";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={"/"} component={LandingPage}/>
          <Route exact path={"/spots/new"} component={CreateSpot}/>
          <Route exact path={"/spots/current"}component={ManageSpots}/>
          <Route exact path={"/spots/:spotId"} component={SpotInfo}/>
          <Route exact path={"/reviews/current"}component={ManageReviews}/>
          <Route exact path={"/spots/:spotId/edit"} component={EditSpot}/>
          <Route exact path={"/bookings/current"} component={ManageBooking}/>
          <Route exact path={"/bookings/:spotId"} component={CreateBooking}/>
        </Switch>
      )}
    </>
  );
}

export default App;
