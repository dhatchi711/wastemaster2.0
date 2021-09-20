import React, { Component, useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import AuthPage from './pages/AuthPage';
import Recyclers from './Components/Recyclers/Recyclers';
import RecyclingNearMe from './Components/RecyclingNearMe';
import MainNavigation from './Components/Navigation/MainNavigation';
import UserPlaces from './Components/UserPages/UserPlaces';
import NewPlace from './Components/UserPages/NewPlace';
import UpdatePlace from './Components/UserPages/UpdatePlace';
import Auth from './Components/Recyclers/pages/Auth';
import { AuthContext } from './Components/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Recyclers />
        </Route>
        <Route path='/:userId/recycle' exact>
          <UserPlaces />
        </Route>
        <Route path="/recycling/new" exact>
          <NewPlace />
        </Route>
        <Route path="/recycling/:recyclingId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Recyclers />
        </Route>
        <Route path="/:userId/items" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );

}

export default App;