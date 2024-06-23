import React from 'react'
import Product from './Product';
import "./Product.scss";
import { Typography } from '@mui/material';


const Products = ({ products, headingText , innerPage , productName, icon ,backgroundColor}) => {
  console.log(products);

  return (
    <div className='main-product'>
      {!innerPage ?
      <Typography textAlign="center" className='popular-text'>{headingText}</Typography>
      :(
        <Typography textAlign="center" className='popular-text'>{productName}</Typography>
      )
       }
      <div className='line'></div>
    <div  className='main-product-div'>
      {products?.map((item)=> (
        <Product key={item?.id} product={item} icon={icon} backgroundColor={backgroundColor}/>
      ))}
    </div>
    </div>
  )
}

export default Products