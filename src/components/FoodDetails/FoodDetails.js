import React, { useState } from 'react';
import { useParams } from 'react-router';
import './FoodDetails.css';
// import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const FoodDetails = () => {
    const [dishdetail,setdishdetail] = useState({});
    const [Image,setImage] = useState('firstimage');
    const {id} = useParams();
    const url = 'http://localhost:8000/fooddetail'
    fetch(`${url}/${id}`)
    .then(res=> res.json())
    .then(data=>{
        setdishdetail(data);
    });
    console.log(dishdetail);
    return (
        <div className='container'>
        <div className='row d-flex flex-wrap'>
        <div className='col-md-6 col-sm-12'>
            <div>
                <h1>{dishdetail.dishName}</h1>
                <p>{dishdetail.details}</p>
            </div>
            <div className='d-flex'>
            <h2>${dishdetail.price}</h2>
            <div className='d-flex'>
            <button>+</button>
            <span className='cart-value'>0</span>
            <button>-</button>
            </div>      
            </div>
            <button>Add</button>
            <div className=''>
         <img src={dishdetail.firstPhoto} className='photos' alt="" />
         <img src={dishdetail.secondPhoto} className='photos' alt="" />
            </div>
        </div>

        <div className='col-md-6 col-sm-12'>
        </div>
      

      
        </div>
       </div>
        
    );
};

export default FoodDetails;

// description: "Best Dish you will have here"
// details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s."
// dishName: "Sandwich"
// dishType: "Breakfast"
// firstPhoto: "https://i.ibb.co/pWdTKYR/breakfast3.png"
// price: "280"
// secondPhoto: "https://i.ibb.co/kDtmRxh/breakfast4.png"
// _id: "60afe43b48a5e52114d8a001"