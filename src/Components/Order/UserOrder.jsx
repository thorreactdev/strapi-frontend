import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import { Button, Typography } from "@mui/material";
import { baseURL } from '../../utils/api';
import "./UserOrder.scss";
import Chip from '@mui/material/Chip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import noOrder from "../../Assets/no-order.jpg";
import {Link} from "react-router-dom"


const UserOrder = () => {
  const { data } = useFetch(`api/orders`);
  console.log(data);

  const getFutureDate = () => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    return currentDate.toLocaleDateString(); // You can adjust the format if needed
};

  return (
    <div className='main-order-div'>
        <h1>Order History</h1>
      <div className='mapped-div'>
        {
          data?.length === 0 ? (
          <div style={{ display : "flex" , alignItems : "center" , justifyContent : "center" , flexDirection : "column" , margin : "30px 0px"}}>
            <Typography variant='h5' fontWeight={700}>You Have No Orders, Yet</Typography>
            <img src={noOrder} alt='' width={400}/>
          </div>
        ):(
          data?.map((item)=>(
            <div key={item?.id} className='order-card'>
              <Typography>Your Order ID is : {item?.id}</Typography>
              <div className='order-card2'>
                <img src={`${baseURL}${item?.attributes?.products?.[0]?.attributes?.img?.data[0]?.attributes?.url}`} alt='product' width={120} />
              <div className='product-detail'>
                <Typography>{item?.attributes?.products?.[0]?.attributes?.title}</Typography>
                <Typography>${item?.attributes?.products?.[0]?.attributes?.Price}</Typography>
              </div>
              </div>
              <Typography sx={{ textAlign : "right" }}>
              <Chip label="Order Confirmed" color='success' icon={<ShoppingCartIcon fontSize='small'/>} sx={{ padding : "7px"}}/>
              <Typography mt={1} >
              <Chip label="Delivery Date" sx={{ mr : 1}}/>
               <Chip label={getFutureDate()}/>
              </Typography>
              </Typography>
            </div>
          ))
        ) 
        }
      </div>
      <div className='btn'>
      <Link to="/">
      <Button variant='contained' >Continue Shopping</Button>
      </Link>
      </div>
    </div>
  )
}

export default UserOrder