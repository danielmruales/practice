import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar.js'
import './ReactTab.css'

class ReactTab extends Component {
    constructor(){
        super()
        this.state={
            fName: '',
            lName: '',
            email: '',
            phone: ''

        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <h1 className='mainTab'>React Bitches</h1>
                <div className='formDiv' >
                    <form className='mainForm'>
                         <input placeholder='First Name' type='text' name='fName'/> 
                         <input placeholder='Last Name' type='text' name='lName'/> 
                         <input placeholder='E-mail' type='email' name='email' /> 
                         <input placeholder='Phone Number' type='number' name='phone'/> 
                         <button>Submit!</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ReactTab;

