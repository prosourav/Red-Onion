import React, { useEffect } from 'react';
import LoginModal from './LoginModal';
import { useLocation } from 'react-router';
import './Login.css'

const Login = () => {
    const [modalIsOpen,setIsOpen] = React.useState(false);
    



    function openModal() {
        setIsOpen(true);
      }
    
    
      function closeModal(){
        setIsOpen(false);
      }

   const pathname = useLocation();
    const path = pathname.pathname;
     

      useEffect(()=> path==='/login' && openModal());


    return (

        <div className='background'>
            <LoginModal modal={modalIsOpen} closeModal={closeModal}></LoginModal>
        </div>
        
    );
};

export default Login;