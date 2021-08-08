import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import AuthPage from './pages/AuthPage';

function App() {
  return (
      <Router>
        <Navbar/>
          <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About}/>
          <Route path='/signin'>
            <AuthPage/>
            </Route>
          </Switch>
      </Router>
  );
}

export default App;