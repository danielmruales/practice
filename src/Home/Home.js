import React from 'react';
import Navbar from '../Navbar/Navbar.js'
import {AwesomeButton } from 'react-awesome-button';
import {Link} from 'react-router-dom'
import './Home.css'
import 'react-awesome-button/dist/styles.css'


const Home = () => {
    return (
        <div>
            <Navbar/>
            <div className='title'> 
                <h1> <span className='arrow'>&#10094;</span> <span className='h'>&#8460;
                    </span> ello Wolrddd<span>&#9884;</span> 
                    <span className='rightArrow'>&#10095;</span> 
                </h1>
                <Link to='/react'><AwesomeButton type="primary" >Cool Button!</AwesomeButton></Link>
                
            </div>
           
        </div>
    );
};

export default Home;