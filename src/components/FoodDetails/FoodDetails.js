import React, { useState } from 'react';
import { useParams } from 'react-router';
import './FoodDetails.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const FoodDetails = () => {
    const [dishdetail,setdishdetail] = useState({});
    const [Image,setImage] = useState('firstimage');
    const [cartValue,setCartValue] = useState(0);
    const {id} = useParams();
    const url = 'http://localhost:8000/fooddetail'
    fetch(`${url}/${id}`)
    .then(res=> res.json())
    .then(data=>{
        setdishdetail(data);
    });
    console.log(dishdetail);

    return (
        <>
        <Header></Header>
        <div className='container'>
        <div className='row d-flex flex-wrap'>
        <div className='col-md-6 col-sm-12'>
            <div>
                <h1>{dishdetail.dishName}</h1>
                <p>{dishdetail.details}</p>
            </div>
            <div className='d-flex'>
            <h2>${dishdetail.price}</h2>
            <div className='d-flex align-items-center justify-content-center cart-btn-div'>
            <button onClick={()=> setCartValue(cartValue+1)}>+</button>
            <span className='cart-value'>{cartValue}</span>
            <button onClick={ (cartValue > 0) ? ()=>  setCartValue(cartValue-1) : ()=>setCartValue(0)}>-</button>
            </div>      
            </div>
            <button className='addButton'><FontAwesomeIcon className="cart" icon={faCartPlus}  />Add</button>
            <div className='foods-photo'>
         <img src={dishdetail.firstPhoto} onClick={()=>setImage('firstimage')} className={Image==='firstimage' ? 'firstimage' : 'photos'} alt="" />
         <img src={dishdetail.secondPhoto} onClick={()=>setImage('secondPhoto')} className={Image==='secondPhoto' ? 'secondPhoto' : 'photos'} alt="" />
            </div>
        </div>

        <div className='col-md-6 col-sm-12'>
        <img src={Image==='firstimage' ? dishdetail.firstPhoto : dishdetail.secondPhoto} className='img-fluid' alt="" />
        </div>
      

      
        </div>
       </div>
       <Footer></Footer>
       </>
       
    );
};

export default FoodDetails;

