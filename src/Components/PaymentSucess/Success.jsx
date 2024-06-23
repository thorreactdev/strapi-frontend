import React, { useEffect } from "react";
import correct from "../../Assets/correct.png";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import "./Success.scss";
import { toast } from "react-toastify";

const Success = () => {
  const { id } = useParams();

  const showToastMessage = () => {
    toast.success("Your payment was successful!");
  };

  useEffect(() => {
    showToastMessage();
  }, [id]);

  return (
    <div className="main-success-div">
      <div className="wrapper-div">
        <img src={correct} alt="" width={50} className="correct_image" />
        <iframe
          src="https://lottie.host/embed/d4b84af1-6072-4560-b3e1-60d914ce2874/trP9ZMPSdG.json"
          title="order_confirmed"
          className="order_conf"
          width={350}
          height={400}
        ></iframe>
        <Typography variant="h5" fontWeight={700}>
          Thank you For Shopping !
        </Typography>
        <Typography>Your Order Has Been Placed</Typography>
        <Link to="/">
          <Button variant="contained" sx={{ mt: 2 }}>
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
