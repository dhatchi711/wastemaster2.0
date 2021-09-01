import React, { Component } from 'react';
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


function App() {
  return (
    <Router>
      <MainNavigation/>
      </main>
      <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About}/>
          <Route path='/recyclers'>
            <Recyclers/>
          </Route>
          <Route path='/recyclingnearme'>
            <RecyclingNearMe/>
          </Route>
          <Redirect to='/'/>
      </Switch>
      </main>
    </Router>
  );
}

export default App;