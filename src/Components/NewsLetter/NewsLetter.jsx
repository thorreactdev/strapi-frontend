import React from "react";
import "./Newsletter.scss";
import facebook from "../../Assets/social_icons/facebook-2020-2-1.svg";
import instgram from "../../Assets/social_icons/instagram-2016-5.svg";
import linkedin from "../../Assets/social_icons/linkedin-icon-3.svg";
import github from "../../Assets/social_icons/github-icon-1.svg";


const NewsLetter = () => {
  
  return (
    <div className="newsletter-main">
      <div className="newsletter-bg-image">
        <div className="newsletter-content">
          <h4 className="small-text">NewsLetter</h4>
          <h2 className="big-text">Signup for latest update and offers</h2>
          <div className="form">
            <input type="email" placeholder="Enter Your Email" />
            <button className="btn-cta">Subscribe</button>
          </div>
          <div className="text">
            Will be usedin accordance with your Privacy Policy
          </div>

          <div className="soical-icons">
            <div>
              <a
                href="https://www.instagram.com/__vinay__04/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={facebook} alt="" width={40} />
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/__vinay__04/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={instgram} alt="" width={30} />
              </a>
            </div>
            <div>
              <a
                href="https://github.com/thorreactdev"
                target="_blank"
                rel="noreferrer"
              >
                <img src={github} alt="" width={30} />
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/vinay-prajapati-3329b3289/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedin} alt="" width={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
