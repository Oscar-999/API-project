import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
// import Spots from "./components/SpotPage";
import AllTiles from "./components/Spots/AllTiles/AllTiles";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
          <Route exact path = "/" component={AllTiles}/>

          <Route path = "/spots/new"/>
          <Route path = "spots/current"/>
          <Route path = '/spots/:id/edit' />
          <Route path = '/spots/:id' />
      </Switch>
        }
    </>
  );
}

export default App;
