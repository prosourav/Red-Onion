import React from 'react';
import './Header.css';
import logo from './../../Images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
const Header = () => {
    return (   
        <div className='d-flex justify-content-between align-items-center bg-dark customStyle fixed-top'>
            <div className='pl-5'>
        <img src={logo} alt="" style={{height:'50px'}} />
            </div>
            <div className='pr-5 mr-5'>
        <FontAwesomeIcon style={{color:'white',paddingTop:'4px'}}  icon={faShoppingCart} size='2x' />
        <span class="badge badge-danger">4</span>
        <button className='nav-btn' style={{marginLeft:'5px'}}>SignIn</button>
        <button className='nav-btn' >SignUp</button>
            </div>
        </div>
    );
};

export default Header;