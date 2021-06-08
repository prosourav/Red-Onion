import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useContext } from 'react';
import { useState } from 'react/cjs/react.development';
import { cartContext } from '../../App';
import './PaymentCard.css';

const PaymentCard = (props) => {

  const [cart,setCart] = useContext(cartContext);
  const [myOrders,setMyOrders] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      // console.log('[PaymentMethod]', paymentMethod);
      
      let product=[];
          cart.forEach((cart)=>{
            product.push({ Name :  cart.prdName,
              Quantity : cart.QuanTity
            });
          })
          const newOrder = {...props.formValue};
          newOrder.paymentId = paymentMethod.id;
          newOrder.Items = product;
          newOrder.userName = cart[0].UserName;

          const url = 'http://localhost:8000/orders'
          fetch(url,
            {method:'POST',
            headers:{'content-type' : 'application/json'},
            body:JSON.stringify(newOrder)
          })
          .then(res=> console.log('server side response: ',res)             
          );

          const Url = 'http://localhost:8000/deleteCart'
          fetch(Url,{
            method:'DELETE'
          })
          .then(res=>res.json())
          .then(result=>{
            console.log('success',result);
          })
            
        

      console.log('this is cart',newOrder);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className='btn btn-primary' type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};
export default PaymentCard;