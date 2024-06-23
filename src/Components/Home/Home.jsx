import React from 'react'
import {  useEffect , useContext} from 'react'
import Banner from './Banner/Banner'
import { Category } from '../Category/Category'
import { fetchDataFromApi } from '../../utils/api'
import { Context } from '../../utils/context'
import Products from '../Products/Products'
import NewsLetter from "../NewsLetter/NewsLetter"

const Home = () => {
  const {categories , setCategories , products , setProducts } = useContext(Context);
  
  useEffect(()=>{
    fetchDataFromApi("api/categories?populate=*").then((data) => setCategories(data)).catch((err)=>console.log(err));
    fetchDataFromApi("api/products?populate=*").then((data) => setProducts(data)).catch((err)=>console.log(err));
  },[setCategories, setProducts]);


  return (
    <div>
        <Banner/>
        <Category categories={categories}/>
        <Products products={products} headingText="Popular Products"/>
        <NewsLetter/>
        
    </div>
  )
}

export default Home