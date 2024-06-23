import React from "react";
import "../Banner/Banner.scss";
import BannerImg from "../../../Assets/banner-img.png";

const Banner = () => {
  return (
    <div className="main-banner">
      <div className="banner-content">
        <div className="text-content">
          <h1>SALE</h1>
          <p>
            Experience unparalleled audio clarity with our state-of-the-art
            headphones. Designed for comfort and engineered for excellence.
          </p>
          <div className="ctas">
            <div className="btn-cta">Read More</div>
            <div className="btn-cta v2">Shop Now</div>
          </div>
        </div>
        <img src={BannerImg} alt="" className="banner-img" />
      </div>
    </div>
  );
};

export default Banner;
