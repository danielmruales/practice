import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar.js'
import './ReactTab.css'

class ReactTab extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <h1 className='mainTab'>React Bitches</h1>
            </div>
        );
    }
}

export default ReactTab;