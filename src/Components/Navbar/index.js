import React from 'react'

import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './Navbar.js';
  
const Navbar = () => {
    return(
        <>
            <Nav>
                <NavLink to="/">
                    <h1>Waste Master</h1>
                </NavLink>
                <Bars/>
                <NavMenu>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/map" activeStyle>
                        Map
                    </NavLink>
                    <NavLink to="/signup" activeStyle>
                        Sign Up
                    </NavLink>
                </NavMenu>
                <NavBtnLink to='/signin'>
                    Sign In
                </NavBtnLink>
            </Nav>
        </>
    );
};

export default Navbar;