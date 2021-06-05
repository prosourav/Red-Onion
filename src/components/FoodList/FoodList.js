import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Foodcard from './../Foodcard/Foodcard';
import './FoodList.css'
const FoodList = () => {
    const [mealType, setMealType] = useState('Breakfast');
    const [foods, setFoods] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8000/dishes')
        .then(res=>res.json())
        .then(data=>setFoods(data))
    },[]);
    const selectedFoods = foods.filter(foods=> foods.dishType === mealType);
    // console.log(selectedFoods);
    return (
        <div>
            <section className='NavItem d-flex justify-content-center align-items-center'>
             <Link onClick={()=>setMealType('Breakfast')}><span className={mealType === 'Breakfast' && 'food'}>Breakfast</span></Link>
             <Link onClick={()=>setMealType('Lunch')}> <span className={mealType === 'Lunch' && 'food'}>Lunch</span></Link>
             <Link onClick={()=>setMealType('Dinner')}><span className={mealType === 'Dinner' && 'food'}>Dinner</span></Link>
            </section>

            <section className='Foods d-flex justify-content-center container flex-wrap'>
              {  
                  selectedFoods.map(foods=>
                    <Foodcard dish={foods} key={foods._id}>
                    </Foodcard>)
              }
            </section>
        </div>
    );
};

export default FoodList;