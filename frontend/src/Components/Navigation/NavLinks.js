import React from 'react';
import {NavLink} from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
    return <ul className='nav-links'>
        <li>
            <NavLink to='/recyclers'>Recyclers</NavLink>
        </li>
        <li>
            <NavLink to='/u1/recycle'>My Recycling</NavLink>
        </li>
        <li>
            <NavLink to='/recycling/new'>Add Item</NavLink>
        </li>
        <li>
            <NavLink to='/auth'>LogIn/SignUp</NavLink>
        </li>
    </ul>
}

export default NavLinks;