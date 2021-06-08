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
import { getUser } from './components/Login/firebase.config';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CompleteOrder from './components/CompleteOrder/CompleteOrder';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';



export const userContext = createContext();
export const cartContext = createContext();

function App() {

const [loggedInUser,setLoggedInUser] = useState(getUser());
 const user = getUser();
//  console.log('app :',user);
const [cart,setCart] = useState([]);

// console.log(loggedInUser.name);
useEffect(()=>{
  const UserName = loggedInUser.name;
  const url = `http://localhost:8000/myCart?name=${loggedInUser.name}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>setCart(data));
},[cart]);



  return (
    <userContext.Provider value = {[loggedInUser,setLoggedInUser]}>
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

     <PrivateRoute path='/food/:id'>
      <FoodDetails></FoodDetails>
     </PrivateRoute>

     <PrivateRoute path='/checkout'>
      <Cart></Cart>
     </PrivateRoute>


     <Route path='/login'>
      <Login></Login>
     </Route>

     <Route path='/signIn'>
      <SignIn></SignIn>
     </Route>


     <Route path='/completeOrder'>
     <Header></Header>
      <CompleteOrder></CompleteOrder>
      <Footer></Footer>
     </Route>

    
     
    </div>
    </Switch>
    </Router>
    </cartContext.Provider>
    </userContext.Provider>
  );
}

export default App;
