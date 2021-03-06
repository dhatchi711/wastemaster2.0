import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return <ul className='nav-links'>
        <li>
            <NavLink to='/recyclers'>Recyclers</NavLink>
        </li>
        {auth.isLoggedIn && (
        <li>
            <NavLink to='/u1/recycle'>My Recycling</NavLink>
        </li>)}
        {auth.isLoggedIn && (
        <li>
            <NavLink to='/recycling/new'>Add Item</NavLink>
        </li>)}
        {!auth.isLoggedIn && (
        <li>
            <NavLink to='/auth'>LogIn/SignUp</NavLink>
        </li>)}
        {auth.isLoggedIn && (
        <li><button onClick={auth.logout}>LOG OUT</button></li>)}
    </ul>
}

export default NavLinks;