import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import './Cart.css';
import { useForm } from 'react-hook-form';
import {CardElement, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentCard from './PaymentCard';
import { cartContext } from '../../App';
import CartDetails from './CartDetails';


const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    
    const [cart,setCart] = useContext(cartContext);
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [formValue,setformValue] = useState({
        Name:'',
        RoadName:'',
        FlatNo:'',
        RoomNo:'',
        AddressPIN:''
    });
    const [isSubmitted,setIsSubmitted] = useState(false);

    const onSubmit =( data , e)=>{
        const newAddress = {
            Name:data.Name,
            RoadName:data.RoadName,
            FlatNo:data.FlatNo,
            RoomNo:data.RoomNo,
            FullAddress:data.FullAddress
        }
        setformValue(newAddress);
        console.log(data);
        e.target.reset();
    }
    return (
        
        <div>
        <Header></Header>
        <div className='container'>
        <div className='row'>
            <div className='col-md-5 col-sm-12'>
            <h3 className='address-heading'>Edit Delivery Details</h3>
            <hr />
            <div className='address-box'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='py-1'>
                <input type="text" class="form-control"  placeholder='Name' {...register("Name", { required: true })} />
                {errors.Name && <span className='text-danger'>Name is required</span>}
                </div>
                <div className='py-1'>
                <input type="text" class="form-control"  placeholder='Road Name' {...register("RoadName", { required: true, maxLength: 20, minLength:5})} />
                {errors.RoadName && <span className='text-danger'> Length of Road Name should be more 5</span>}
                </div>
                <div className='py-2'>
                <input type="email" class="form-control"  placeholder='Flat No' {...register("FlatNo", { required: true })} />
                {errors.FlatNo && <span className='text-danger'> Flat No is required</span>}
                </div>
                <div className='py-2'>
                <input type="text" class="form-control" placeholder='Room No' {...register("RoomNo", { required: true})} />
                {errors.FlatNo && <span className='text-danger'> Room No is required</span>}
                </div>
                <div className='py-2'>
                <textarea class="form-control" placeholder='Full Address with PIN' type="text-area" {...register("FullAddress", { required: true})} rows="2" />
                {errors.FullAddress && <span className='text-danger'>Full Address No is required</span>}
                </div>
                <div className='py-2 '>
                <input class="form-control bg-danger text-white" type="submit"  />
                </div>
              
            </form>
            {isSubmitted &&  <div>
                   <h1>Please Make Payment</h1>
                      <Elements stripe={stripePromise}>
                      <PaymentCard></PaymentCard>
                      </Elements>
            </div>}
 
            </div>
        </div>
                <div className='col-md-6 col-sm-12 cart-box'>
                    <div className='cart-calculation mt-3 ml-2'>
                    <h3 className='mb-5'>Form Star Kabab And Restaura
                    Arriving in 20-30 min
                    107 Rd No 9</h3>
                    <div className='cart-item'>
                   {
                       cart.map(cart=><CartDetails cart={cart}></CartDetails>)
                   }
                    </div>
                    </div>
                </div>
         </div>
        </div>
    </div>
    );
};

export default Cart;