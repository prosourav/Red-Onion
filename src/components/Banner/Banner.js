import React, { useEffect, useState } from 'react';
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
        <h1>Best food waiting for your Belly</h1>
             <div className='search'>
             <input type="text" onChange={getSearchItem} placeholder='Search your food here'/>
             <button className='search-button' onClick={()=>setSearchProducts(search)}>Search</button>
             </div>
             </div>
        </div>
        </div>
    );
};

export default Banner;


  // const url = 'http://localhost:8000/dishesdata?search='+search;
        // useEffect(()=>{
        //     fetch(url)
        //     .then(res=>res.json())
        //     .then(data=>setSearchProducts(data));
        // },[search]);