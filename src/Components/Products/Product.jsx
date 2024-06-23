import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { baseURL } from "../../utils/api";
import "./Product.scss";
import { Link } from "react-router-dom";
import { Context } from "../../utils/context";
import { toast } from "react-toastify";

const Product = ({ product, icon , backgroundColor }) => {
  const { removeFromWishList } = useContext(Context);

  const removeFromWish = () =>{
    removeFromWishList(product.id);
    toast.success("Product Removed From Wishlist");
  }

  return (
    <Card className="product-card" elevation={4}>
      <Link
        to={`/product/${product?.id}`}
        style={{ textDecoration: "none" }}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <CardMedia
          image={`${baseURL}${product?.[0]?.attributes?.img?.data?.[0]?.attributes?.formats?.small?.url}`}
          className="card-media-img"
        />
      </Link>
      <CardContent>
        <Typography>
          {product?.attributes?.title.substring(0, 50) + "..."}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" fontWeight="bold">
          ${product?.attributes?.Price} /-
        </Typography>
        <span
          className="cross-icon2"
          title="remove item"
          onClick={removeFromWish}
          style={{backgroundColor}}
        >
          {icon}
        </span>
      </CardContent>
    </Card>
  );
};

export default Product;
