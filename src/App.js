import React, { createContext, useEffect, useState } from 'react';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FoodDetails from './components/FoodDetails/FoodDetails';
import Cart from './components/Cart/Cart';
import SignIn from './components/Login/SignIn';
import Login from './components/Login/Login';
import Header from './components/Header/Header';


export const cartContext = createContext();

function App() {

const [cart,setCart] = useState([]);

useEffect(()=>{
  fetch('http://localhost:8000/myCart')
  .then(res=>res.json())
  .then(data=>setCart(data));
},[cart]);



  return (
    <cartContext.Provider value = {[cart,setCart]}>
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

     <Route path='/checkout'>
      <Cart></Cart>
     </Route>


     <Route path='/login'>
      <Login></Login>
     </Route>

     <Route path='/signIn'>
      <SignIn></SignIn>
     </Route>
     
    </div>
    </Switch>
    </Router>
    </cartContext.Provider>
  );
}

export default App;
