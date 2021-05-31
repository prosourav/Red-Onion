import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import './FoodDetails.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { cartContext } from '../../App';


const FoodDetails = () => {
    const [cart,setCart] = useContext(cartContext);
    const [success,setSuccess] = useState(false);
    const [dishdetail,setdishdetail] = useState({});
    const [Image,setImage] = useState('firstimage');
    const [cartValue,setCartValue] = useState(1);
    const {id} = useParams();
    const url = 'http://localhost:8000/fooddetail'
    fetch(`${url}/${id}`)
    .then(res=> res.json())
    .then(data=>{
        setdishdetail(data);
    });
    // console.log(dishdetail);
    // console.log(props);
    
    const handleaddToCart = (product,qounatity) =>{
        console.log("product and quantity from function: ",product,qounatity);
        const newCart = {
          prdName:product.dishName,
          QuanTity:qounatity,
          cost: product.price,
          prdImage:product.firstPhoto
        }
       
        const added = cart.find(cart=>cart.prdName===product.dishName);
        console.log(added);
        if(added){
          // console.log("product and quantity from if block of function : ",product,qounatity);
            const id = added._id;
            const newQuantity = qounatity;
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
        setTimeout(()=>setSuccess(false),2000)
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
            <button onClick={()=> setCartValue(cartValue+1)}>+</button>
            <span className='cart-value'>{cartValue}</span>
            <button onClick={()=> (cartValue > 1) && setCartValue(cartValue-1)}>-</button>
            </div>      
            </div>

           
            <button  onClick={()=>handleaddToCart(dishdetail,cartValue)} className='addButton'><FontAwesomeIcon className="cart" icon={faCartPlus}  />Add</button>
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

//