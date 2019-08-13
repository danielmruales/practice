import React from 'react';
import Navbar from '../Navbar/Navbar.js'
import './Home.css'

const Home = () => {
    return (
        <div>
            <Navbar/>
            <h1 className='title' > <span className='arrow'>&#10094;</span> <span className='h'>&#8460;</span> ello Wolrddd<span>&#9884;</span> <span className='rightArrow'>&#10095;</span> </h1>
        </div>
    );
};

export default Home;