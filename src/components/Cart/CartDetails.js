import React from "react";
// import { useState } from "react/cjs/react.development";
import "./CartDetails.css";


const CartDetails = (props) => {
const { prdName, QuanTity, cost, prdImage, _id} = props.cart;
// const [newQuantity,setNewQuantity] = useState(QuanTity);
 
//  const handleQuantity = () =>{

//  }

 const handleDelete=(id)=>{
    
   const url = `https://polar-basin-19195.herokuapp.com/deleteItem/${id}`;
   fetch(url,{
       method:'DELETE'
   })
 .then(res=>res.json())
 .then(result=>{
   console.log('success',result);
 })
};
const handleUpdate =(id,newQuantity)=>{
   // console.log('id:',id +'  ',"quantity: ",newQuantity)
   const updateCartQuantity = {id,newQuantity} 
   const url = `https://polar-basin-19195.herokuapp.com/updateQuantity/${id}`;
            fetch(url,{
              method:'PATCH',
              headers:{'Content-type' : 'application/json'},
              body:JSON.stringify(updateCartQuantity)
            })
            .then(res=>res.json())
            .then(data=>{
              console.log('updated');
            })
}

 return (
    <div className="item">
      <div className="d-flex align-items-center justify-content-around">
        <div>
          <img src={prdImage} style={{ width: "100px" }} alt="" />
        </div>
        <div>
          <h4 style={{ fontWeight: "bold", color: "dark-red" }}>{prdName}</h4>
          <h5>${cost}</h5>
        </div>
        <div className="d-flex flex-column">
          <div className="cal-sec">
            <button onClick={()=>handleUpdate(_id,QuanTity+1)}>+</button>
            <span className="px-2">{QuanTity}</span>
            <button onClick={QuanTity>1 ? ()=>handleUpdate(_id,QuanTity-1) : false}>-</button>
          </div>
          <div>
            <button className="my-3 text-white bg-danger rounded" onClick={()=>handleDelete(_id)}>
              Remove
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CartDetails;
