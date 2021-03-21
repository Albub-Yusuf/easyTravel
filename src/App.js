import logo from './logo.svg';
import './App.css';

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



// create and export auth and vehicle context api
export const AuthContext = createContext();
export const VehicleContext = createContext();





function App() {

  // initialize statehook for context api
  const [loggedInUser, setLoggedInUser] = useState({

    name: '',
    email: '',
    isLoggedIn: '',
    isRegistered: '',
    hasError: '',
  });

  const [vehicleInfos, setvehicleInfos] = useState({

    id: '',
    name: '',
    capacity: '',
    cost: '',
    image: '',
    economy: '',
    luxury: '',


  })

  return (
    // Set rote
    <div>
      <AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <VehicleContext.Provider value={[vehicleInfos, setvehicleInfos]}>
          <Router>
            <Navbar></Navbar>
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="/home">
                <Home></Home>
              </Route>
              <PrivateRoute path="/destination">
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

        </VehicleContext.Provider>
      </AuthContext.Provider>



    </div>
  );
}

export default App;
