import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "./api";
import { fetchDataFromApi } from "./api";
// import { useNavigate } from "react-router-dom";

export const Context = createContext();
// const navigate = useNavigate();

const AppContext = ({ children }) => {
  //GLOBAL VARIABLE
  const token = localStorage.getItem("jwtToken");
  const userData = localStorage.getItem("userData");
  const jsonUserData = JSON.parse(userData);
 

  // STATE VARIABLE DECLARATION
 
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const[userInfo , setUserInfo] = useState(null);
  const[wishlist, setWishlist] = useState(()=> {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : []
  });
  const[wishlistCount , setWishListCount] = useState(wishlist.length);
  console.log(wishlistCount);

  console.log(wishlist);

 

 //USEEFFECT CODE GOES HERE 

  useEffect(() => {
    let count = 0;
    cartItems?.map((item) => (count += item.attributes.quantity));
    setCartCount(count);

    let subtotal = 0;
    cartItems?.map(
      (item) => (subtotal += item.attributes.Price * item.attributes.quantity)
    );
    setCartSubtotal(subtotal);
  }, [cartItems]);

  //THIS USEEFECT HANDLES THE TOKEN FOR AUTHENICATION
  useEffect(()=>{
    console.log(token);
    if(token){
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);
    }
  },[token]);

  //THIS USEEFECT HANDLE WISHLIST ITEM IN THE LOCALSTORAGE
  useEffect(()=>{
    localStorage.setItem("wishlist" , JSON.stringify(wishlist));
    setWishListCount(wishlist.length);
  },[wishlist]);

  //HANDLE ADD TO WISHLIST FUNCTIONALITY
  function addToWishlist(product){
    setWishlist((prevWishlist) => [...prevWishlist, product]);
    // alert("Product Added To wishlist");
  }

  //HANDLES REMOVE FROM WISHLIST
  function removeFromWishList(productID){
    setWishlist((prevWishlist) => prevWishlist?.filter(item => item.id !== productID));
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  //HANDLE ADD TO CART FUNCTIONALITY
  function addtoCart(product, quantity) {
    if(!token){
      return toast.error("Please Register or Login");
    }
    let items = [...cartItems];
    console.log("Product to add:", product);
    console.log("Cart items:", items);

    let index = items.findIndex((p) => {
      console.log(
        "Comparing:",
        p.id,
        product?.id,
        typeof p.id,
        typeof product?.id
      );
      return typeof p.id === typeof product?.id && p.id === product?.id;
    });

    console.log("Index found:", index);

    if (index !== -1) {
      items[index].attributes.quantity += quantity;
      console.log("Updated quantity:", items[index].attributes.quantity);
      toast.success(
        `Product Added to the cart ${items[index].attributes.quantity}`
      );
    } else {
      product.attributes.quantity = quantity;
      items = [...items, product];
      console.log("Added new product:", items);
      toast.success(`Product Added to the cart ${quantity}`);
    }
    setCartItems(items);
    // localStorage.setItem("cartItems" , JSON.stringify(cartItems));
    
  }

  //HANDLE PRODUCT QUANTITY

  function handleproductQuantity(type, product) {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);
    console.log("Index found:", index);

    if (type === "inc") {
      items[index].attributes.quantity += 1;
    } else if (type === "dec") {
      if (items[index].attributes.quantity === 1) return;
      items[index].attributes.quantity -= 1;
    }
    setCartItems(items);
  }

  //HANDLE REMOVE FROM CART FUNCTIONALITY
  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items?.filter((p) => p.id !== product?.id);
    console.log(items);
    setCartItems(items);
    // localStorage.removeItem("cartItems");
  };

  //HANDLE LOGOUT FUNCTIONALITY

  const handleLogout = () =>{
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
    // localStorage.removeItem("cartItems");
    setIsAuthenticated(false);
    if(cartItems.length > 0){
      setCartItems([]);
    }
    toast.success("Logout Successfully");
  }


  //HANDLE USER INFORMATION
  async function handleUserInfo(){
    try {
      const response = await fetch(`http://localhost:1337/api/users/me?populate=*` , {
        method : "GET",
        headers :{
          Authorization : `Bearer ${token}`
        }
      });

      if(response.ok){
        const data = await response.json();
        console.log(data);
        setUserInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //HANDLE USERORDER PAGE

  
  
  useEffect(()=>{
    handleUserInfo();
  },[token]);

  return (
    <Context.Provider
      value={{
        categories,
        setCategories,
        products,
        setProducts,
        addtoCart,
        cartItems,
        cartCount,
        cartSubtotal,
        showCart,
        setShowCart,
        handleproductQuantity,
        handleRemoveFromCart,
        isAuthenticated,
        token,
        jsonUserData,
        handleLogout,
        handleUserInfo,
        userInfo,
        wishlist, 
        wishlistCount, 
        addToWishlist, 
        removeFromWishList, 
        isInWishlist
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
