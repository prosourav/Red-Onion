import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import moment from "moment";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";
import swal from "sweetalert";
import { cartContext, orderContext, userContext } from "../../App";
import "./PaymentCard.css";

const PaymentCard = (props) => {
  const [cart, setCart] = useContext(cartContext);
  const [orderId, setOrderId] = useContext(orderContext);
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [myOrders, setMyOrders] = useState(null);
  const [error, setError] = useState(false); 
  const stripe = useStripe();
  const elements = useElements();
  console.log('orderId: ',orderId);
  const history = useHistory();

  let gorderid = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    const toastId = toast.loading("Loading...");
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
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setTimeout(() => toast.dismiss(toastId, setError(error.message)), 1000);
      console.log("[error]", error);
      // ;
    } else {
      // console.log('[PaymentMethod]', paymentMethod);
      let genaratedId = gorderid();
      setOrderId(genaratedId);

      const time = moment().add(35, 'minutes').format('hh:mm A');
            
      let product = [];
      cart.forEach((cart) => {
        product.push({ Name: cart.prdName, Quantity: cart.QuanTity });
      });
      const newOrder = { ...props.formValue };
      newOrder.paymentId = paymentMethod.id;
      newOrder.Items = product;
      newOrder.userName = loggedInUser.name;
      newOrder.orderId = genaratedId;
      newOrder.time = time;

      const url = "https://polar-basin-19195.herokuapp.com/orders";
      fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newOrder),
      }).then((res) => console.log("server side response: ", res));

      const Url = "https://polar-basin-19195.herokuapp.com/deleteCart";
      fetch(Url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("success", result);
        });
        console.log(newOrder);
      setError(false);
    
      toast.dismiss(toastId);
      swal("Payment Successful", "Thankyou For Your Order", "success").then(
        () => history.push("/completeOrder")
      );

      // console.log('this is cart',newOrder);
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button className="btn btn-primary" type="submit" disabled={!stripe}>
          Pay
        </button>
        {error && (
          <p style={{ color: "red", display: "inline", marginLeft: "5%" }}>
            {error}
          </p>
        )}
      </form>
      <Toaster></Toaster>
    </>
  );
};
export default PaymentCard;
