import React, { useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const FoodDetails = () => {
    const [dishdetail,setdishdetail] = useState({})
    const {id} = useParams();
    const url = 'http://localhost:8000/fooddetail'
    fetch(`${url}/${id}`)
    .then(res=> res.json())
    .then(data=>{
        setdishdetail(data);
    });
    console.log(dishdetail.dishName);
    return (
        <>
        <div>
        <Header></Header>
        </div>
   
        <div className='container d-flex flex-wrap'>
        <div>
        <h1>{dishdetail.dishName}</h1>
        <p>{dishdetail.details}</p>
        </div>
        <div></div>
        </div>
       </>
        
    );
};

export default FoodDetails;