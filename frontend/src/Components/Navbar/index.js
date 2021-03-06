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
                    <NavLink to="/login" activeStyle>
                        Log In
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;