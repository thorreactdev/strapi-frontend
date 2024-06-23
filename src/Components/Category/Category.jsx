import React from "react";
import "./Category.scss";
import { Box } from "@mui/material";
import { baseURL } from "../../utils/api";
import { useNavigate } from "react-router-dom";

export const Category = ({ categories }) => {
  console.log(categories);
  const navigate = useNavigate();
  

  return (
    <Box className="main-category">
      <Box className="card-stack-img"  >
        {categories?.map((item) => (
          <div key={item?.id} onClick={()=> navigate(`/category/${item?.id}`)} >
            <img
              src={`${baseURL}${item?.attributes?.img?.data?.[0]?.attributes?.formats?.small?.url}`}
              alt={item?.attributes?.title}
              className="category-img"
            />
            {/* <Typography variant="body1" fontSize={17} fontWeight={500} textAlign="center">{item?.attributes?.title}</Typography> */}
          </div>
        ))}
      </Box>
    </Box>
  );
};

// category-img
