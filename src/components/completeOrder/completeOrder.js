import React, { useEffect } from 'react';
import './CompleteOrder.css';
import map from './../../Images/ordercomplete.png'
import rider from './../../Images/Image/rider.png';
import { useContext, useState } from 'react/cjs/react.development';
import { orderContext, userContext } from '../../App';
const CompleteOrder = () => {
   const [myOrder,setMyorder] = useState({});
   const [loggedInUser,setLoggedInUser] = useContext(userContext);
   const [orderId, setOrderId] = useContext(orderContext);
   
   useEffect(()=>{
      // const UserName = loggedInUser.name;
      const url = `http://localhost:8000/myOrders?orderId=${orderId}`;
      fetch(url)
      .then(res=>res.json())
      .then(data=>setMyorder(data));
    },[myOrder]);
    console.log('my order orderId: ', myOrder);
   return (
      <div className='container-fluid main'>
      <div className='row'>
        <div className="col-md-8 col-sm-12 ml-5 mt-5 map-div">
        <div className='center'>
        <img src={map} alt="" className='img-fluid mt-5'/>
        </div>      
        </div>
       
      <div className="col-md-3 mt-5 delivery">
         <div className='delivery-icon'>
         <img src={rider} style={{width:'100px'}} alt="" className='img-fluid rider mt-5'/>
         </div>
         <h5>Order Id :</h5>
         <p style={{background:'white'}}></p>
         <h5>Your Location :</h5>
         <p style={{textAlign:'center',background:'white'}}>Road Name : </p>
         <h5>Shop Name :</h5><div style={{background:'white',textAlign:'center'}}>
         <h6 style={{background:'white'}}>Brownie Bites</h6>
         <span>Address : Dimm Street 32/A,2nd floor,Ontario 2342</span></div>
         <h4>Estimated Delivery : </h4>
      </div>
      </div>
      </div>
   );
};

export default CompleteOrder;
// {myOrder[0].orderId}
// {myOrder[0].RoadName},Room No-{myOrder[0].RoomNo}
// {myOrder[0].time}