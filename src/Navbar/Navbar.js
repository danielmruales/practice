import React from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='mainNavbarDiv'>
                        
            <Link to='/' className='navBarTitle'>Home</Link>
            <Link to='/vanillajs' className='listItem'> Vanilla JS </Link>
            <Link to='/' className='listItem'>Item 2 </Link>
            <Link to='/' className='listItem'>Item 3 </Link>
            
        </div>
    );
};

export default Navbar;