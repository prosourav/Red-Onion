import React from 'react';
import { useForm } from "react-hook-form";
import google from './../../Images/ICON/google.png';

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit =( data , e)=> {
        const {name,email,password} =data;
        if(name && email && password){
        console.log('signIn ',data);
        e.target.reset();
    }
    if(!name && email && password){
        console.log('working');
    }
    }
    const handlegoogleLogin =()=>{
        console.log('googleLog in');
    }
    return (
        <div>
            <h4 style={{textAlign:'center'}}>Please SignIn</h4>
   
            <form onSubmit={handleSubmit(onSubmit)} className='mx-5 login-form'>
            
            <div className='py-1'>
            <input placeholder='Enter your name' type="text" class="form-control" {...register("Name", { required: true })} />
            {errors.Name?.type === 'required' && <span className='text-danger'>Name is required</span>}
            </div>
            <div className='py-1'>
            <input placeholder='Enter your email' type="email" class="form-control" {...register('email',{ required:true,
            pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} />
            {errors.email?.type === 'pattern' && <span className='text-danger'>Email is Badly formatted</span> || errors.email?.type === 'required' && <span className='text-danger'>Email is recquired</span> }</div>
            <div className='py-1'>
            <input type="password" class="form-control"  placeholder='Password' {...register("password", { required: true, minLength:6,
            pattern:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{5,}$/ })} />
            {errors.password?.type === 'pattern' && <small className='text-danger'> Password must be contain Uppercase lowerCase and Digits</small> ||
            errors.password?.type === 'required' && <span className='text-danger'>Password is required</span> || 
            errors.password?.type === 'minLength' && <span className='text-danger'>Password is must be 7 digit long</span>
            }
            </div>
            
            <div className='py-2 '>
            <input class="form-control bg-danger  text-white" type="submit"/> 
            </div>
            
            </form>
           <div style={{textAlign:"center"}}>  
            <h3>or</h3>
            </div>
            <div className="G-sign">
    
            <h5 style={{color:"whitesmoke"}} onClick={()=>handlegoogleLogin} className="option mx-3" >  <img style={{width:'30px', height:'30px'}} src={google} alt="" /> &nbsp; Continue with Google</h5>
    
            </div>
            
            <small style={{color:'black', margin:'25% 30%', fontWeight:'bold'}}>Have an Account? login</small>
        </div>
    );
};

export default Login;