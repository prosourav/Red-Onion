import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useForm } from "react-hook-form";
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import toast, { Toaster } from 'react-hot-toast';



if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }



const SignIn = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const history=useHistory();
    
    const onSubmit =( data , e)=> {
        
        const {Name,email,Confirmpassword} = data;
        // console.log(data);
        
        firebase.auth().createUserWithEmailAndPassword(email,Confirmpassword)
        .then((userCredential) => {

          verifyEmail();
          
          updateUserName(Name);
          
          const user = userCredential.user;
          // console.log(user);
          toast.success('Verification link has been send');
          setTimeout(()=>{ swal("Signup Is Almost Complete!", "Please Verify Your Email", "success")
          .then(()=>history.push('/logIn'));},3000)
         
        //  }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          swal("Ooops..!", errorMessage, "error");
        });

         e.target.reset();
    }
    function verifyEmail (){
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function() {
        // Email sent.
        }).catch(function(error) {
        // An error happened.
        });
    }
    const updateUserName=function(name){
        const user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name,
        }).then(function() {
        console.log('Name updated');
        }).catch(function(error) {
        // An error happened.
        });
    }
    


    return (
        <div>
        <Toaster/>
        <div className='form-box'>
        <h4 style={{textAlign:'center'}}>Please Signup</h4>
   
        <form onSubmit={handleSubmit(onSubmit)} className='mx-5'>
        
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



        <div className='py-1'>
        <input type="password" class="form-control"  placeholder='Confirm Password' {...register("Confirmpassword", { required: true, minLength:6, validate: (value) => value === watch('password'),
        pattern:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{5,}$/ })} />
        {errors.Confirmpassword?.type === 'pattern' && <small className='text-danger'> Password must be contain Uppercase lowerCase and digits</small> ||
        errors.Confirmpassword?.type === 'required' && <span className='text-danger'>Password is required</span> || 
        errors.Confirmpassword?.type === 'minLength' && <span className='text-danger'>Password is must be 7 digit long</span> ||
        errors.Confirmpassword?.type === 'validate' && <span className='text-danger'>Password doesn't match</span>
        }
        </div>

        
        <div className='py-2 '>
        <input class="form-control bg-danger  text-white" type="submit"/> 
        </div>
        
        </form>
       <div style={{textAlign:"center"}}>  
        <h6>or</h6>
        </div>
      
       
        <small style={{color:'black', margin:'25% 32%', fontWeight:'bold'}}>Have An Account? <Link to='/login'> login </Link></small>
        
        </div>  
        
        </div>
        
    );
};

export default SignIn;


