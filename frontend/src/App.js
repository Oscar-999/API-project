import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/LandingPage/LandingPage";
import SpotInfo from "./components/Spots/SpotInfo/SpotInfo.js";
// import AllTiles from "./components/Spots/AllTiles/AllTiles";
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
          <Route exact path="/" component={Spots} />
          <Route path="/spots/new"></Route>
          <Route path="/spots/current"></Route>
          <Route path="/spots/:spotId" component={SpotInfo} />
        </Switch>
      )}
    </>
  );
}

export default App;
