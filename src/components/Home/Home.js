import React from 'react';
import About from '../About/About';
import Banner from '../Banner/Banner';
import FoodList from '../FoodList/FoodList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <FoodList></FoodList>
            <About></About>
            <Footer></Footer>
            
        </div>
    );
};

export default Home;