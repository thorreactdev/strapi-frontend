import React, { useEffect, useState } from "react";
import "./Search.scss";
import CloseIcon from "@mui/icons-material/Close";
// import { Context } from '../../../utils/context';
import { useFetch } from "../../../hooks/useFetch";

// import { toast } from 'react-toastify';
import { baseURL } from "../../../utils/api";
import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import product from "../../../Assets/category/product-removebg-preview.png";

const Search = ({ setSearchModal }) => {
  const [query, setQuery] = useState("");
  //   const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  console.log(query);

  let { data, loading } = useFetch(
    `api/products?populate=*&filters[title][$contains]=${query}`
  );

  if (!query.length) {
    data = null;
  }
  console.log(data);

  useEffect(() => {
    if (query.length > 0) {
      setSearchPerformed(true);
    } else {
      setSearchPerformed(false);
    }
  }, [query]);

  return (
    <div className="main-search-div">
      <div className="form-field">
        <input
          type="text"
          placeholder="Search For product..."
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
        />
        <CloseIcon fontSize="large" onClick={() => setSearchModal(false)} />
      </div>
      <div className="product-data">
        {loading ? (
          <CircularProgress />
        ) : query.length === 0 ? (
          <div className="search-query">
            <img
              src={product}
              alt=""
              width={400}
            />
            <Typography
              variant="h5"
              fontWeight={500}
              textAlign={"center"}
            //   marginTop={20}
            >
              Please Search The Product You are Looking For...
            </Typography>
          </div>
        ) : searchPerformed && data?.length === 0 ? (
          <div className="no-product-found">
            <img
              src="https://www.dogstrust.org.uk/images/800x600/assets/2022-08/pug_stock.png"
              alt="no product found"
              width={600}
            />
            <Typography className="text2" textAlign="center">
              The Product You Are Searching Is Not Available
            </Typography>
            <Link to="/" onClick={() => setSearchModal(false)}>
              <Button variant="contained">Back To Home</Button>
            </Link>
          </div>
        ) : (
          data?.map((item) => (
            <Link
              to={`/product/${item?.id}`}
              style={{ textDecoration: "none", color: "#000" }}
              key={item?.id}
              onClick={() => {
                setSearchModal(false);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <div className="single-product-data">
                <div style={{ backgroundColor: "#ccc", padding: "10px 12px" }}>
                  <img
                    src={`${baseURL}${item?.attributes?.img?.data?.[0]?.attributes?.formats?.small?.url}`}
                    alt={item?.attributes?.title}
                    width={70}
                  />
                </div>
                <div className="text">
                  <span>{item?.attributes?.title}</span>
                  <span>
                    {item?.attributes?.desc.substring(0, 100) + "...."}
                  </span>
                </div>
                <Divider sx={{ color: "#000" }} />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
