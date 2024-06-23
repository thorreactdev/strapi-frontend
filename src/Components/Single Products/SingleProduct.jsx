import React, { useState , useContext} from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { baseURL } from "../../utils/api";
import { Divider, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import facebook from "../../Assets/facebook-color-svgrepo-com.svg"
import instagram from "../../Assets/instagram-2016-5.svg"
import linkedin from "../../Assets/linkedin-icon-3.svg";
import "./SingleProducts.scss";
import RelatedProduct from "./Relatedproducts/RelatedProduct";
import { Context } from "../../utils/context";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toast } from "react-toastify";
import FavoriteIcon from '@mui/icons-material/Favorite';
// import { red } from "@mui/material/colors";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data } = useFetch(`api/products?populate=*&[filters][id]=${id}`);
  const { addtoCart , addToWishlist, removeFromWishList, isInWishlist } = useContext(Context);
  if (!data) return "Loading...";
  // console.log(data?.[0]?.attributes?.categories?.data?.[0]?.id);

  
  const product = data[0];
  console.log(product);
  const isWishlisted = isInWishlist(product.id);
  console.log(isWishlisted);

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishList(product.id);
      toast.error("Product Remove From WishList");
      // return toast.error("product already in Wishlist");
    } else {
      addToWishlist(product);
      toast.success("Product Added To WishList");
    }
  };

  function incrementQuantity() {
    setQuantity((prevQuantity) => prevQuantity + 1);
  }

  function decrementQuantity() {
    setQuantity((prevQuantity) => {
      if (prevQuantity === 1) return 1;
      return prevQuantity - 1;
    });
  }



  return (
    <div className="single-prod-main">
      <div className="layout">
        <div className="single-prod-detail">
          <div
            // style={{ backgroundColor: "#ccc", width: "500px" }}
            className="single-prod-left-div"
          >
            <img
              src={`${baseURL}${data[0]?.attributes?.img?.data?.[0]?.attributes?.formats?.small?.url}`}
              alt={data[0]?.attributes?.title}
            />
            <span className="wishlist-btn" onClick={handleWishlistClick}>
            {
              isWishlisted ? (
                <FavoriteIcon sx={{ color : "#ff4b2b"}} fontSize="large"/>
              ):(
                <FavoriteBorderIcon fontSize="large"/>
              )
            }
            </span>

          </div>
          <div className="single-prod-right-div">
            <div className="right-side-text">
              <Typography className="product-title">
                {data?.[0]?.attributes?.title}
              </Typography>
              <Typography className="product-title">
                ${data?.[0]?.attributes?.Price}
              </Typography>
              <Typography className="desc-text">
                ${data?.[0]?.attributes?.desc}
              </Typography>
            </div>
            <div className="cart-buttons">
              <div className="quantity-button">
                <span onClick={incrementQuantity}>+</span>
                <span>{quantity}</span>
                <span onClick={decrementQuantity}>-</span>
              </div>
              <button className="cart-button" onClick={()=>{
                addtoCart(data[0] , quantity)
                setQuantity(1);
              }}>
                <ShoppingCartIcon fontSize="small" />
                ADD TO CART
              </button>
            </div>
            <Divider sx={{ marginTop : "30px"}}/>
            <div className="category-info">
              <span className="category-text">
                Categories:
              </span>
              <span>
                {data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.title}
              </span>
            </div>
            <div className="share-products">
              <span className="share-text">Share:</span>
              <div className="social-icons">
                <img src={facebook} alt="" width={25}/>
                <img src={instagram} alt="" width={25}/>
                <img src={linkedin} alt="" width={25}/>
              </div>
            </div>
          </div>
        </div>

        <RelatedProduct productID={id} categoryID={data?.[0]?.attributes?.categories?.data?.[0]?.id} />
      </div>
    </div>
  );
};

export default SingleProduct;
