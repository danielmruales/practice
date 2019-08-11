import React from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='mainNavbarDiv'>
            
            {/* Using ahref tags until I import links from the React router package */}
            
            <Link to='/' className='navBarTitle'>This is a Navbar</Link>
            <Link to='/' className='listItem'>Item 1 </Link>
            <Link to='/' className='listItem'>Item 2 </Link>
            <Link to='/' className='listItem'>Item 3 </Link>
            
        </div>
    );
};

export default Navbar;