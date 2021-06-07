import React, { useContext } from 'react';
import './Header.css';
import logo from './../../Images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { cartContext, userContext } from '../../App';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import "firebase/auth";
import firebase from "firebase/app";

const Header = () => {

    const history = useHistory();
    const [cart,setCart] = useContext(cartContext);
    const [loggedInUser,setLoggedInUser] = useContext(userContext);
    // console.log('loggedInUser: ',loggedInUser);
    const logout = () =>{
        firebase.auth().signOut().then(() => {
            const newUser ={...loggedInUser};
            newUser.name = '';
            newUser.email = '';
            newUser.isSignedIn = false;
            setLoggedInUser(newUser);
            localStorage.removeItem('token');
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
    return (   
        <div className='d-flex justify-content-between align-items-center bg-dark customStyle fixed-top'>
            <div className='pl-5'>
        <img src={logo} alt="" style={{height:'50px'}} />
            </div>
            <div className='pr-5 mr-5'>
        <FontAwesomeIcon style={{color:'white',paddingTop:'4px',cursor:'pointer'}} onClick={()=>history.push('/checkout')} icon={faShoppingCart} size='2x' />
        <span class="badge badge-danger">{cart.length}</span>
        {loggedInUser.isSignedIn ? <span className='text-white px-2'>{loggedInUser.name}</span>  :
       <Link to='/login'><button className='nav-btn' style={{marginLeft:'5px'}}>SignIn</button> </Link> 
        }
        {loggedInUser.isSignedIn ? 
        <button className='nav-btn' onClick={logout} >Logout</button>:
       <Link to='/signIn'><button className='nav-btn' >SignUp</button></Link>
        }
            </div>
        </div>
    );
};

export default Header;