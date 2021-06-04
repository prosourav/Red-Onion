import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useForm } from "react-hook-form";
import google from './../../Images/ICON/google.png';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }



const SignIn = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const history=useHistory();
    // const [signInUser,setSignInUser] = useState({
    //     user:'',
    //     email:'',
    //     error:'',
    //     success:''
    // })
    const onSubmit =( data , e)=> {
        
        const {Name,email,password} =data;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in

          verifyEmail();
          updateUserName(Name);
          const user = userCredential.user;
          console.log(user);
          swal("Good job!", "SignUp Successful", "success").then(()=>history.push('/logIn'));
          
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
    


    const handlegoogleLogin =()=>{
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(googleProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    const credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    console.log('user: ',user);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
  });
    }


    return (
        <div>
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
        
        <div className='py-2 '>
        <input class="form-control bg-danger  text-white" type="submit"/> 
        </div>
        
        </form>
       <div style={{textAlign:"center"}}>  
        <h6>or</h6>
        </div>
        <div className="G-sign">

        <h5 style={{color:"whitesmoke"}} onClick={handlegoogleLogin} className="option mx-3" >  <img style={{width:'30px', height:'30px'}} src={google} alt="" /> &nbsp; Continue with Google</h5>

        </div>
       
        <small style={{color:'black', margin:'25% 32%', fontWeight:'bold'}}>Have An Account? <Link to='/login'> login </Link></small>
        
        </div>
        </div>
        
    );
};

export default SignIn;