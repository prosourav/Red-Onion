import React, { createContext, useState } from 'react';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FoodDetails from './components/FoodDetails/FoodDetails';
// import Cart from './components/Cart/Cart';

export const cartContext = createContext();

function App() {

const [cart,setCart] = useState([]);

const handleaddToCart = (product,qounatity) =>{
  // console.log(product);
  const newCart = {
    prdName:product.dishName,
    QuanTity:qounatity,
    cost: product.price,
    prdImage:product.firstPhoto
  }
  const url = 'http://localhost:8000/addToCart'
       fetch(url,
         {method:'POST',
         headers:{'content-type' : 'application/json'},
         body:JSON.stringify(newCart)
       })
       .then(res=> console.log('server side response: ',res)             
       );
}

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
      <FoodDetails handleaddToCart={handleaddToCart}></FoodDetails>
     </Route>

    
     
    </div>
    </Switch>
    </Router>
    </cartContext.Provider>
  );
}

export default App;
