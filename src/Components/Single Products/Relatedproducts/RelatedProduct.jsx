import React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import Products from "../../Products/Products"

const RelatedProduct = ({ productID , categoryID }) => {
    console.log(productID);
    console.log(categoryID);

    const { data } = useFetch(`api/products?populate=*&filters[id][$ne]=${productID}&filters[categories][id]=${categoryID}&pagination[start]=0&pagination[limit]=3`);
    console.log(data);


  return (
    <div className='related-products' style={{ marginTop : "25px"}}>
        <Products headingText="Related Products" products={data} />
    </div>
  )
}

export default RelatedProduct
