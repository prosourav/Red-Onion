import React, { useState } from 'react';
import './Banner.css';
const Banner = ({setSearchProducts}) => {
    const [search,setSearch] = useState('');

    const getSearchItem =(e)=>{
        setSearch(e.target.value);
    } 
    
    // console.log(searchproducts);
    return (
        <div>

        <div className='banner d-flex justify-content-center align-items-center '>
        <div>
        <h1 className='banner-heading'>Best food waiting for your Belly</h1>
             <div className='search'>
             <input type="text" onChange={getSearchItem} placeholder='Search your food here' className='search-bar'/>
             <button className='search-button' onClick={()=>setSearchProducts(search,window.scrollBy(0, 500))}>Search</button>
             </div>
             </div>
        </div>
        </div>
    );
};

export default Banner;

