import React from 'react';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FoodDetails from './components/FoodDetails/FoodDetails';
function App() {
  return (
    <Router>
    <Switch>
    <div>

    <Route exact path='/'>
     <Home></Home>
     </Route>

     <Route path='/home'>
     <Home></Home>
     </Route>

     <Route path='/food/:id'>
      <FoodDetails></FoodDetails>
     </Route>
     
    </div>
    </Switch>
    </Router>
  );
}

export default App;
