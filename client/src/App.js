import React from 'react';
import './App.css';
import LoginUser from './components/LoginUser.js';
import RegisterUser from './components/RegisterUser.js';
import Users from './components/Users.js';

import { Route, NavLink } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <header>
        <NavLink to="/">Home</NavLink>
        <br />
        <NavLink to="/login">Login</NavLink>
        <br />
        <NavLink to="/register">Register</NavLink>
      </header>
      <Route path="/login" component={LoginUser} />
      <Route path="/register" component={RegisterUser} />
      <Route exact path="/" component={Users} />
    </div>
  );
}

export default App;
