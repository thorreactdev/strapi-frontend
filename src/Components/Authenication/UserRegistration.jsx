import React, { useState } from "react";
import "./UserRegistration.scss";
import { TextField, Box, Typography, Button, Checkbox,  } from "@mui/material";
import { baseURL } from "../../utils/api";
import { toast } from "react-toastify";
// import google from "../../Assets/google.svg";
import {Link, useNavigate} from "react-router-dom";


const UserRegistration = () => {
  const navigate = useNavigate();
  const initialData = {
    username: "",
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialData);

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }
  console.log(userData);

  async function handleUserLogin() {
    try {
      if(userData?.username.length < 3 || userData?.username.length > 15  ){
        return toast.error("Username Must be of atleast of 3 character");
      }

      if(userData?.password.length < 6 || userData?.password?.length > 10){
        return toast.error("Password Must be of atleast 6");
      }
      if (userData.username && userData.email && userData.password) {
        const response = await fetch(`${baseURL}/api/auth/local/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        console.log(response);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserData(initialData);
          toast.success("User Registered Sucessfully");
          localStorage.setItem("jwtToken" , data?.jwt);
          // localStorage.setItem("user" , JSON.stringify(data?.user));
          navigate(`/login`);

        } else {
          const data = await response.json();
          toast.error(data?.message || "Registration Failed");
        }
      } else {
        toast.error("All Fields Are Required");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box className="main-register-div">
      <Box className="input-fields">
        <Typography variant="body" className="text">
          Sign Up Here
        </Typography>
        <TextField
          type="text"
          id="outlined-basic"
          label="Enter Username"
          // placeholder="Enter Username *"
          variant="outlined"
          name="username"
          required
          value={userData.username}
          onChange={handleChange}
          autoComplete="off"
          // sx={{ textTransform : "uppercase"}}
        />
        <TextField
          type="email"
          id="outlined-basic"
          label="Enter Email"
          //   variant="outlined"
          name="email"
          // placeholder="Enter Email"
          required
          value={userData.email}
          onChange={handleChange}
          autoComplete="off"
        />
        <TextField
          type="password"
          id="outlined-basic"
          label="Enter Password"
          variant="outlined"
          name="password"
          required
          value={userData.password}
          onChange={handleChange}
          autoComplete="off"
          
        />
        <Box className="remember-me">
        <Checkbox/>
        <Typography variant="subtitle1">
        I want to receive inspiration, marketing promotions and updates via email.
        </Typography>
      </Box>
        <Button variant="contained" onClick={handleUserLogin}>
          Register
        </Button>
        <Typography sx={{ textAlign : "right" , textDecoration : "underline" , color : "#1976d2" , marginTop : -.7}}>
        <Link to="/login"  style={{ textDecoration : "none" , color : "#1976d2"}}>
          Already Have an Account ? Login
        </Link>
        </Typography>
      </Box>
      
    </Box>
  );
};

export default UserRegistration;
