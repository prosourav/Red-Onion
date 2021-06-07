import React from "react";
import "./CartDetails.css";


const CartDetails = (props) => {
 const { prdName, QuanTity, cost, prdImage} = props.cart;


 
   

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
            <button>+</button>
            <span className="px-2">{QuanTity}</span>
            <button>-</button>
          </div>
          <div>
            <button className="my-3 text-white bg-danger rounded">
              Remove
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CartDetails;
