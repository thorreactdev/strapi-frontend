import React, { useContext } from "react";
import "./Cart.scss";
import { Context } from "../../utils/context";
import CloseIcon from "@mui/icons-material/Close";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartItems from "./CartItems/CartItems";
import {loadStripe} from "@stripe/stripe-js"
import { makePayment } from "../../utils/api";
import { toast } from "react-toastify";

const Cart = () => {
  const { setShowCart, cartItems, cartSubtotal,token } = useContext(Context);
  const navigate = useNavigate();
  const publishKey = "pk_test_51PRUtSRtnEwarTxblec8cU7qkAhLzKFTWahl8BYV63GlZBd0u4jCqD1XDM2JThWvj5X2Fj74AW1SX01Ygd1CKa7t004XDU4qM6";
  const stripePromise = loadStripe(publishKey);


  const handlePayment = async () => {
    try {
      if(!token){
        return toast.error("Please Login Or Register");
      }
      let stripe = await stripePromise;
      console.log(stripe);
      if (!stripe) throw new Error('Stripe.js failed to load');
      console.log(stripe._apiKey);
      
      const res = await makePayment.post("/api/orders", {
        products: cartItems,
        // desc : cartItems[0].attributes.desc,
      });

      console.log(res);
  
      if (!res.data || !res.data.stripeSession) throw new Error('Stripe session creation failed');
  
      const { id } = res.data.stripeSession;
  
      const result = await stripe.redirectToCheckout({ sessionId: id });
      if (result.error) throw new Error(result.error.message);
      // navigate("/success");
      
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error.message}`);
    }
  };
  

  return (
    <div className="cart-panel">
      <div className="opac-layer" onClick={() => setShowCart(false)}></div>

      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <CloseIcon className="icon" />
            <span className="text">Close</span>
          </span>
        </div>

        {!cartItems.length && (
          <div className="empty-cart">
            <RemoveShoppingCartIcon />
            <span>No Product in the cart</span>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8e2de2",
                ":hover": {
                  backgroundColor: "#8e2de2",
                },
              }}
              onClick={() => {
                setShowCart(false);
                navigate("/");
              }}
            >
              Return to home
            </Button>
          </div>
        )}

        {!!cartItems.length && (
          <>
            <CartItems />
            <div className="cart-footer">
              <div className="subtotal">
                <span style={{ textTransform: "uppercase" }}>Subtotal:</span>
                <span style={{ color: "#8e2de2" }}>$ {cartSubtotal}</span>
              </div>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8e2de2",
                  ":hover": {
                    backgroundColor: "#8e2de2",
                    width: "100%",
                  },
                }}

                onClick={handlePayment}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
