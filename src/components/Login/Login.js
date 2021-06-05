import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import google from './../../Images/ICON/google.png';
import firebase from "firebase/app";
import firebaseConfig from './firebase.config';
import './Login.css'
import { userContext } from '../../App';


if(firebase.apps.length === 0){
    firebaseConfig.initializeApp(firebaseConfig);
  }
const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser,setLoggedInUser] = useContext(userContext);
    // const [emailVerified,setEmailVerified]=useState(false);

    const onSubmit =( data , e)=> {

        const {email,password}=data;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const emailVerified = user.emailVerified;
          if(emailVerified){
           
            setJWTToken();
            const newUser ={...loggedInUser};
            newUser.name = user.displayName;
            newUser.email = user.email;
            newUser.isSignedIn = true;
            setLoggedInUser(newUser);
            alert('login successfull');
          }
          else{
            alert('Your Email is Not verified');
          }
            

        })
        .catch((error) => {
        //   const errorCode = error.code;
          const errorMessage = error.message;
          console.log('errorMessage:',errorMessage);
        });
        e.target.reset();
    }


    const setJWTToken = () => {
        return firebase
            .auth().currentUser
            .getIdToken(true)
            .then(idToken => {
                localStorage.setItem('token', idToken);
            }) ;
           
    }

    const signOut =()=>{
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
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
    setJWTToken();
    const newUser ={...loggedInUser};
    newUser.name = user.displayName;
    newUser.email = user.email;
    newUser.isSignedIn = true;
    setLoggedInUser(newUser);
    alert('login successfull');

    // console.log('userg: ',user);
  }).catch((error) => {
    // Handle Errors here.
    // const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // const credential = error.credential;
    console.log(errorMessage);
    // ...
  });
    }
    return (
        <div>
        <div className='form-box'>
            <h4 style={{textAlign:'center'}}>Please LogIn</h4>
   
            <form onSubmit={handleSubmit(onSubmit)} className='mx-5'>
            
            <div className='py-2'>
            <input placeholder='Enter your email' type="email" class="form-control" {...register('email',{ required:true })} />
            { errors.email?.type === 'required' && <span className='text-danger'>Email is recquired</span> }</div>

            <div className='py-2'>
            <input type="password" class="form-control"  placeholder='Password' {...register("password", { required: true, minLength:6,maxLength:15 })} /> 
            {errors.password?.type === 'required' && <span className='text-danger'>Password is required</span> }
            </div>
            <div className='py-3'>
            <input class="form-control bg-danger  text-white" type="submit"/> 
            </div>
            
            </form>
           <div style={{textAlign:"center"}}>  
            <h6>or</h6>
            </div>
            <div className="G-sign">
    
            <h5 style={{color:"whitesmoke"}} onClick={handlegoogleLogin} className="option mx-3" >  <img style={{width:'30px', height:'30px'}} src={google} alt="" /> &nbsp; Continue with Google</h5>
    
            </div>
           
            <small style={{color:'black',fontWeight:'bold', margin:'5% 36%'}}>New User? <Link to='/signIn'>SignUp</Link> </small>
           
        </div>
        </div>
    );
};

export default Login;