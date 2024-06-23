import React, { useContext } from 'react';
import { Context } from '../../utils/context';
import "./WishLists.scss";
import Products from "../Products/Products"
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const WishList = () => {
  const {  wishlist } = useContext(Context);
  console.log(wishlist);
  return (
    <div className='main-wishlist'>
      {wishlist.length === 0 ? (
        <div className='empty-wishlist'>
          <dotlottie-player src="https://lottie.host/c21c5e5e-c451-4dd2-b9b5-dfe93033b7c9/hoCRZePbBC.json" background="transparent" speed="1"  loop autoplay style={{ width : "400px" , height : "500px"}}></dotlottie-player>
          {/* <iframe src="https://lottie.host/embed/c21c5e5e-c451-4dd2-b9b5-dfe93033b7c9/hoCRZePbBC.json" title='no Products'></iframe> */}
          <Typography className='text'>your wishlist is empty , go shop now</Typography>
          <Link to="/">
          <Button variant='contained'>Shop Now</Button>
          </Link>
        </div>
      ):(
        <Products products={wishlist} headingText="Your Wishlist" icon={<CloseSharpIcon/>} backgroundColor="#ccc"/>
      )}
    </div>
  )
}

export default WishList