import React from 'react';
import { useHistory } from 'react-router';
import './Foodcard.css';
const Foodcard = (props) => {
    const {_id,dishName,description,price,firstPhoto} = props.dish;
    const history = useHistory();
    const handleOnclick = id =>{
        history.push(`food/${id}`);
    }
    return (
        <div className='single-card'>
        <div className='my-card'>
            <img src={firstPhoto} alt="" />
            <h2>{dishName}</h2>
            <p>{description}</p>
            <h4>${price}</h4>
            <button className='btn btn-danger w-25' onClick={()=>handleOnclick(_id)}>Details</button>
        </div>
        </div>
    );
};

export default Foodcard;