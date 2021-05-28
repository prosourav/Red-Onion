import React from 'react';
import './Foodcard.css';
const Foodcard = (props) => {
    const {_id,dishName,description,price,firstPhoto} = props.dish;
    return (
        <div className='single-card'>
        <div className='my-card'>
            <img src={firstPhoto} alt="" />
            <h2>{dishName}</h2>
            <p>{description}</p>
            <h4>${price}</h4>
            <button className='btn btn-danger w-25'>Details</button>
        </div>
        </div>
    );
};

export default Foodcard;