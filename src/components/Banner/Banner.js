import React from 'react';
import './Banner.css';
const Banner = () => {
    return (
        <div>

        <div className='banner d-flex justify-content-center align-items-center '>
        <div>
        <h1>Best food waiting for your Belly</h1>
             <div className='search'>
             <input type="text" placeholder='Search your food here'/>
             <button className='search-button'>Search</button>
             </div>
             </div>
        </div>
        </div>
    );
};

export default Banner;