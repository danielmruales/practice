import React from 'react';
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='mainNavbarDiv'>
            
            {/* Using ahref tags until I import links from the React router package */}
            
            <a href='none' className='navBarTitle'>This is a Navbar</a>
            <a href='none' className='listItem'>Item 1 </a>
            <a href='none' className='listItem'>Item 2 </a>
            <a href='none' className='listItem'>Item 3 </a>
            
        </div>
    );
};

export default Navbar;