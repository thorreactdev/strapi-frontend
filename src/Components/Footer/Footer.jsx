import React from "react";
import "./Footer.scss";
import TelegramIcon from "@mui/icons-material/Telegram";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import { Divider, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col1">
          <div className="title">About</div>
          <div className="messsage text">
            Welcome to Head Store, where we bring you the best in audio
            technology. Explore our curated selection of high-quality headphones
            designed to enhance your listening experience.
          </div>
        </div>
        <div className="footer-col1">
          <div className="title">Contact</div>
          <div className="contact-flex-div">
            <div className="contact-details">
            <TelegramIcon sx={{ color : "rgba(0,0,0,.5)"}}/>
            <p className="text">234 Elm Street Anytown, USA 12345</p>
            </div>
            <div className="contact-details">
              <PhoneAndroidIcon sx={{ color : "rgba(0,0,0,.5)"}}/>
              <p className="text">Phone: +91 1234567890</p>
            </div>
            <div className="contact-details">
              <EmailIcon sx={{ color : "rgba(0,0,0,.5)"}}/>
              <p className="text">Email: reactprajapati@gmail.com</p>
            </div>
            
          </div>
        </div>
        <div className="footer-col1">
          <div className="title">Categories</div>
          <div className="text categories-flex">
            <div>Headphone</div>
            <div>Smart Watches</div>
            <div>Bluetooth Speaker</div>
            <div>Wireless earbuds</div>
            <div>projector</div>
            <div>Home theatre</div>
          </div>
        </div>
        <div className="footer-col1">
          <div className="title">Pages</div>
          <div className="text categories-flex">
            <div>Home</div>
            <div>About</div>
            <div>Privacy Policy</div>
            <div>Return</div>
            <div>Terms & Condition</div>
          </div>
        </div>
      </div>
        <Divider/>
      
        <Typography className="footer-text">HEADSTORE.COM 2024 Created by Vinay Dev <br/>
          <a href="https://portfolioprajapati.netlify.app" target="_blank" rel="noreferrer" className="anchor-tag">
           Visit Portfolio
         </a>
        </Typography>
    </footer>
  );
};

export default Footer;
