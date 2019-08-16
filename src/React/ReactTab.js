import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar.js'
import './ReactTab.css'

class ReactTab extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <h1 className='mainTab'>React Bitches</h1>
                <div className='formDiv' >
                    <form className='mainForm'>
                         <input placeholder='First Name'/> 
                         <input placeholder='Last Name'/> 
                         <input placeholder='E-mail'/> 
                         <input placeholder='Phone Number'/> 
                         <button>Submit!</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ReactTab;