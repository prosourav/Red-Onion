import React from 'react';
import Adddish from '../Adddidish/Adddish';
import FoodList from '../Adddidish/FoodList/FoodList';
import Banner from '../Banner/Banner';
import Header from '../Header/Header';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <FoodList></FoodList>
        </div>
    );
};

export default Home;