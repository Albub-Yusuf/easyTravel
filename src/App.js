import logo from './logo.svg';
import './App.css';
// or less ideally


import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";

import { createContext, useState } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Destination from './components/Destination/Destination';
import Navbar from './components/NavBar/Navbar'


export const AuthContext = createContext();
export const VContext = createContext();





function App() {

  const [loggedInUser, setLoggedInUser] = useState({

    name: '',
    email : '',
    isLoggedIn : '',
    isRegistered: '',
    hasError:'',
  });

  const [vinfo, setVinfo] = useState({

    id: '',
    name: '',
    capacity:'',
    cost:'',
    image:'',
    economy:'',
    luxury:'',


  })

  return (
    <div>

<AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <VContext.Provider value={[vinfo, setVinfo]}> 
      <Router>
      <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
              <Home></Home>
          </Route>
          <Route path="/home">
              <Home></Home>
          </Route>
          <PrivateRoute path={`/destination/:id`}>
            <Destination></Destination>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>

   
      </VContext.Provider>
    </AuthContext.Provider>

    
    
    </div>
  );
}

export default App;
