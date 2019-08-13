import React from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='mainNavbarDiv'>
                        
            <Link to='/' className='navBarTitle'>Home</Link>
            <Link to='/vanillajs' className='listItem'> Vanilla JS </Link>
            <Link to='/react' className='listItem'>Nothin but React </Link>
            <Link to='/' className='listItem'>CSS </Link>
            <Link to='/' className='listItem'>Other </Link>
            
        </div>
    );
};

export default Navbar;