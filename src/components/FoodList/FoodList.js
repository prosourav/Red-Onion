import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Foodcard from './../Foodcard/Foodcard';
import './FoodList.css';


const FoodList = ({searchResult,setSearhResult}) => {
    const [mealType, setMealType] = useState('Breakfast');
    const [foods, setFoods] = useState([]);
   
   
    useEffect(()=>{
        fetch('https://polar-basin-19195.herokuapp.com/dishes')
        .then(res=>res.json())
        .then(data=>setFoods(data))
    },[]);

    const selectedFoods = foods.filter(foods=> foods.dishType === mealType);
    // console.log('searchResult: ',searchResult);
    //  searchResult ? console.log('many food'): console.log('no food');
    return (
        <div>
      
    
            {(searchResult.length === 18)  ?
             <section className='NavItem d-flex justify-content-center align-items-center'>
             <Link onClick={()=>setMealType('Breakfast')}><span className={mealType === 'Breakfast' && 'food'}>Breakfast</span></Link>
             <Link onClick={()=>setMealType('Lunch')}> <span className={mealType === 'Lunch' && 'food'}>Lunch</span></Link>
             <Link onClick={()=>setMealType('Dinner')}><span className={mealType === 'Dinner' && 'food'}>Dinner</span></Link>
             </section>  :
            <h4 style={{fontWeight:'bold',borderBottom:'2px solid red',textAlign:'center',width:'230px',margin:'40px auto'}}>Your Search Result</h4>
             
             
           }       
           
         

            <section className='Foods d-flex justify-content-center container flex-wrap'>
              { (searchResult.length === 18)  ?
                  selectedFoods.map(foods=>
                    <Foodcard dish={foods} key={foods._id}>
                    </Foodcard>):
                    searchResult.map(foods=>
                        <Foodcard dish={foods} key={foods._id}>
                        </Foodcard>)
              }
            </section>
      {  (searchResult.length !== 18) &&   <button className='food-btn' onClick={()=>searchResult.length=18}>See our all food</button>}
        </div>
    );
};

export default FoodList;