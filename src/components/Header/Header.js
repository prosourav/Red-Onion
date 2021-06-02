import React, { useContext } from 'react';
import './Header.css';
import logo from './../../Images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { cartContext } from '../../App';
import { useHistory } from 'react-router';

const Header = () => {

    const history = useHistory();
    const [cart,setCart] = useContext(cartContext);
    return (   
        <div className='d-flex justify-content-between align-items-center bg-dark customStyle fixed-top'>
            <div className='pl-5'>
        <img src={logo} alt="" style={{height:'50px'}} />
            </div>
            <div className='pr-5 mr-5'>
        <FontAwesomeIcon style={{color:'white',paddingTop:'4px'}} onClick={()=>history.push('/checkout')} icon={faShoppingCart} size='2x' />
        <span class="badge badge-danger">{cart.length}</span>
        <button className='nav-btn' style={{marginLeft:'5px'}}>SignIn</button>
        <button className='nav-btn' >SignUp</button>
            </div>
        </div>
    );
};

export default Header;