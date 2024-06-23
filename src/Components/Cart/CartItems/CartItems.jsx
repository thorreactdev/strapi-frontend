import React, { useContext } from "react";
import "./CartItems.scss";
import { Context } from "../../../utils/context";
import { baseURL } from "../../../utils/api";
import CloseIcon from "@mui/icons-material/Close";

const CartItems = () => {
  const { cartItems, handleproductQuantity , handleRemoveFromCart} = useContext(Context);
  console.log(cartItems);

  // const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  // console.log(cartData);
  return (
    <div className="cart-product">
      {cartItems?.map((item) => (
        <div key={item?.id} className="main-product-div">
          <div className="image-container">
            <img
              src={`${baseURL}${item?.attributes?.img?.data?.[0]?.attributes?.formats?.small?.url}`}
              alt={item?.attributes?.title}
              width={80}
            />
          </div>
          <div className="product-details">
            <span className="name">{item?.attributes?.title}</span>
            <CloseIcon onClick={()=> handleRemoveFromCart(item)}  fontSize="small"/>
            <div className="quantity-buttons">
              <span onClick={()=>{handleproductQuantity("dec" , item)}}>-</span>
              <span>{item?.attributes?.quantity}</span>
              <span onClick={()=> handleproductQuantity("inc" , item)}>+</span>
            </div>
            {/* <div className="text">
              <span>{item?.attributes?.quantity}</span>
              <span>x</span>
              <span>${item.attributes.Price * item.attributes.quantity}</span>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
