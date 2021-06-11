import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import About from '../About/About';
import Banner from '../Banner/Banner';
import FoodList from '../FoodList/FoodList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Home = () => {
    const [searchproducts,setSearchProducts] = useState([]);
    const [searchResult,setSearhResult] = useState([]);
    // console.log('From home: ',searchproducts);
    useEffect(()=>{
        fetch('https://polar-basin-19195.herokuapp.com/dishesdata?search='+searchproducts)
        .then(res=>res.json())
        .then(data=>setSearhResult(data));
    },[searchproducts]);
//    console.log('search result: ',searchResult);

    return (
        <div>
            <Header></Header>
            <Banner setSearchProducts={setSearchProducts}></Banner>
            <FoodList searchResult={searchResult} setSearhResult={setSearhResult}></FoodList>
            <About></About>
            <Footer></Footer>
            
        </div>
    );
};

export default Home;