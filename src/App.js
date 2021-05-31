import React from 'react';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FoodDetails from './components/FoodDetails/FoodDetails';
import Cart from './components/Cart/Cart';
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

     <Route path='/cart'>
    <Cart></Cart>
    </Route>
     
    </div>
    </Switch>
    </Router>
  );
}

export default App;
