import React from 'react';
import './CompleteOrder.css';
import map from './../../Images/ordercomplete.png'
import rider from './../../Images/Image/rider.png';
const CompleteOrder = () => {
   return (
      <div className='container-fluid'>
      <div className='row'>
        <div className="col-md-8 col-sm-12 ml-5 mt-5">
        <img src={map} alt="" className='img-fluid map mt-5'/>
        </div>
       
      <div className="col-md-3 mt-5">
      <img src={rider} alt="" className='img-fluid rider mt-5'/>
      </div>
      </div>
      </div>
   );
};

export default CompleteOrder;