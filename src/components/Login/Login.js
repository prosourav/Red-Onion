import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }
const Login = () => {
    return (
        <div>
            
        </div>
    );
};

export default Login;