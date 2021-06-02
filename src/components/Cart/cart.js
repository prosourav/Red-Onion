import React, { useState } from 'react';
import Header from '../Header/Header';
import './Cart.css';
import { useForm } from 'react-hook-form';

const Cart = () => {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [formValue,setformValue] = useState({});

    const onSubmit =( data , e)=>{
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
                <input type="Number" class="form-control" placeholder='Room No' value={32} {...register("Room No", { required: true})} />
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
            </div>
        </div>
        <div className='col-md-5 col-sm-12'>
        <h1>cart section</h1>
        </div>
        </div>
        </div>
        </div>
    );
};

export default Cart;