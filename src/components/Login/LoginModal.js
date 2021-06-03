import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useForm } from "react-hook-form";
import './LoginModal.css';
import google from './../../Images/ICON/google.png';


if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }

const customStyles = {
    
    
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '500px',
    width                 :'440px',
    borderRadius:'12px',
    boxShadow:'1px 1px 273px 274px lightGrey'
  }
};

Modal.setAppElement('#root');

const LoginModal = (modalIsOpen,closeModal) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const[option,setOption] = useState('logIn');
    const onSubmit = data => console.log(data);


    return (
        <div>
    
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div className={option==='logIn' ? 'show' : 'hide'}>
            <h4 style={{textAlign:'center'}}>Please Login</h4>
        <form onSubmit={handleSubmit(onSubmit)} className='mx-5 login-form'>
        <div className='py-1'>
        
        <input placeholder='Enter your email' type="email" class="form-control" {...register('email',{ required:true,
        pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} />
        {errors.email?.type === 'pattern' && <span className='text-danger'>Email is Badly formatted</span> || errors.email?.type === 'required' && <span className='text-danger'>Email is recquired</span>}</div>
        <div className='py-1'>
        <input type="password" class="form-control"  placeholder='Password' {...register("password", { required: true, minLength:6,
        pattern:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{5,}$/ })} />
        {errors.password?.type === 'pattern' && <span className='text-danger'> Password must be contain Uppercase lowerCase Digits</span> ||
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
 
    <div className="G-sign">
       
    <h5 style={{color:"whitesmoke"}} className="option mx-3" >  <img style={{width:'30px', height:'30px'}} src={google} alt="" /> &nbsp; Continue with Google</h5>
     
    </div>
    </div>
    <small style={{color:'black', margin:'25% 35%', fontWeight:'bold'}} onClick={()=>setOption('signIn')}>New User SignIn?</small>
    </div>


    <div className={option==='signIn' ? 'show' : 'hide'}>
    <h4 style={{textAlign:'center'}}>Please SignIn</h4>
   
<form onSubmit={handleSubmit(onSubmit)} className='mx-5 login-form'>

<div className='py-1'>
<input placeholder='Enter your name' type="text" class="form-control" {...register("Name", { required: true })} />
{errors.Name?.type === 'required' && <span className='text-danger'>Name is required</span>}
</div>
<div className='py-1'>
<input placeholder='Enter your email' type="email" class="form-control" {...register('email',{ required:true,
pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} />
{errors.email?.type === 'pattern' && <span className='text-danger'>Email is Badly formatted</span> || errors.email?.type === 'required' && <span className='text-danger'>Email is recquired</span>}</div>
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

<div className="G-sign">

<h5 style={{color:"whitesmoke"}} className="option mx-3" >  <img style={{width:'30px', height:'30px'}} src={google} alt="" /> &nbsp; Continue with Google</h5>

</div>
</div>
<small style={{color:'black', margin:'25% 30%', fontWeight:'bold'}} onClick={()=>setOption('logIn')}>Have an Account? login</small>
</div>

        </Modal>
        </div>
    );
};

export default LoginModal;