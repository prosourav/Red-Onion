import React from 'react';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
    <Switch>
    <div>

    <Route path='/'>
     <Home></Home>
     </Route>
     
    </div>
    </Switch>
    </Router>
  );
}

export default App;
