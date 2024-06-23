import React from 'react';
import "./CategoryProd.scss";
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
// import Product from '../Products/Product';
import Products from '../Products/Products';

const CategoryProd = () => {
    const { id } = useParams();
    const{ data }   = useFetch(`api/products?populate=*&[filters][categories][id]=${id}`);
    const productName = data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.title;
    console.log(productName);
  return (
    <div>
        {/* <h2>{data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.title}</h2> */}
        <div>
            <Products products={data} innerPage={true} productName={productName}/>
        </div>
    </div>
  )
}

export default CategoryProd