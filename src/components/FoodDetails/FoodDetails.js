import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './FoodDetails.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { cartContext, userContext } from '../../App';


const FoodDetails = () => {
    const [loggedInUser,setLoggedInUser] = useContext(userContext);
    const [cart,setCart] = useContext(cartContext);
    const [success,setSuccess] = useState(false);
    const [dishdetail,setdishdetail] = useState({});
    const [Image,setImage] = useState('firstimage');
    const [QuantityValue,setQuantityValue] = useState(1);
    const {id} = useParams();

 

    // getting details of dish from db
    useEffect(()=>{
      const url = 'http://localhost:8000/fooddetail'
      fetch(`${url}/${id}`)
      .then(res=> res.json())
      .then(data=>{
          setdishdetail(data);
      });
    },[]);
   

   
    
    // adding cart and quantity value (product and dishdetail same but as a parameter i changed the name)
    const handleaddToCart = (product,quantity) =>{
        console.log("product and quantity from function: ",product,quantity);

        const newCart = {
          UserName:loggedInUser.name,
          prdName:product.dishName,
          QuanTity:quantity,
          cost: product.price,
          prdImage:product.firstPhoto
        }
       
        const added = cart.find(cart=>cart.prdName===product.dishName);

        if(added){
          // console.log("product and quantity from if block of function : ",product,quantity);
            const id = added._id;
            const newQuantity = quantity;
            const updateCartQuantity = {id,newQuantity} 

            // console.log('updateCartQuantity:',updateCartQuantity)
            const url = `http://localhost:8000/updateQuantity/${id}`;
            fetch(url,{
              method:'PATCH',
              headers:{'Content-type' : 'application/json'},
              body:JSON.stringify(updateCartQuantity)
            })
            .then(res=>res.json())
            .then(data=>{
              console.log('updated');
            })
            setSuccess(true);
        }
        else{
             const url = 'http://localhost:8000/addToCart'
               fetch(url,
               {method:'POST',
               headers:{'content-type' : 'application/json'},
               body:JSON.stringify(newCart)
               })
               .then(res=> console.log('server side response: ',res)             
               );
               setSuccess(true);
              }
         }
      if(success){
        setTimeout(()=>setSuccess(false),2000);
      }


    return (
        <>
        <Header></Header>
        <div className='container'>
        <div className='row d-flex flex-wrap'>
        <div className='col-md-6 col-sm-12'>
            <div>
                <h1>{dishdetail.dishName}</h1>
                <p>{dishdetail.details}</p>
            </div>
            <div className='d-flex'>
            <h2>${dishdetail.price}</h2>
            <div className='d-flex align-items-center justify-content-center cart-btn-div'>
            <button onClick={()=> setQuantityValue(QuantityValue+1)}>+</button>
            <span className='cart-value'>{QuantityValue}</span>
            <button onClick={()=> (QuantityValue > 1) && setQuantityValue(QuantityValue-1)}>-</button>
            </div>      
            </div>

           
            <button  onClick={()=>handleaddToCart(dishdetail,QuantityValue)} className='addButton'><FontAwesomeIcon className="cart" icon={faCartPlus} />Add</button>
            {success &&  <span className='text-success success'> <FontAwesomeIcon className="cart text-success" icon={faCheckCircle} />Item added to cart</span>}
            

            <div className='foods-photo'>
         <img src={dishdetail.firstPhoto} onClick={()=>setImage('firstimage')} className={Image==='firstimage' ? 'firstimage' : 'photos'} alt="" />
         <img src={dishdetail.secondPhoto} onClick={()=>setImage('secondPhoto')} className={Image==='secondPhoto' ? 'secondPhoto' : 'photos'} alt="" />
            </div>
        </div>

        <div className='col-md-6 col-sm-12'>
        <img src={Image==='firstimage' ? dishdetail.firstPhoto : dishdetail.secondPhoto} className='img-fluid' alt="" />
        </div>
      

      
        </div>
       </div>
       <Footer></Footer>
       </>
       
    );
};

export default FoodDetails;

