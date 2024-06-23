import React, { useState } from 'react';
import "./Login.scss";
import { TextField, Box, Typography, Button,  } from "@mui/material";
import { baseURL } from '../../utils/api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const initialLoginData ={
        identifier :"",
        password : "",
    }
    const[userLogin , setUserLogin] = useState(initialLoginData);

    function handleChange(e){
        setUserLogin({
            ...userLogin, [e.target.name] : e.target.value
        });
    }

    async function handleLogin(){
        try {
        if(userLogin.identifier && userLogin.password){
            const response = await fetch(`${baseURL}/api/auth/local`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(userLogin)
            });
            if(response.ok){
                console.log(response);
                const data = await response.json();
                console.log(data);
                localStorage.setItem("jwtToken" , data?.jwt);
                localStorage.setItem("userData" , JSON.stringify(data?.user));
                toast.success(`${data?.user?.username} ,Welcome Login Sucessfull`);
                navigate("/");
            }else{
                toast.error("Invalid Email or Password");
            }
        }else{
            toast.error("Please Enter Email and Password");
        }
        } catch (error) {
            console.log(error);
        }
    }

    console.log(userLogin);

  return (
    <Box className="main-register-div">
        <Box className="input-fields">
        <Typography variant="body" className="text">
            Login Here
        </Typography>
        <TextField
          type="email"
          id="outlined-basic"
          label="Enter Email"
          name="identifier"
          placeholder="Enter Email or Username"
          required
          value={userLogin?.identifier}
          onChange={handleChange}
          className='text1'
        />
        <TextField
          type="password"
          id="outlined-basic"
          label="Enter Password"
          variant="outlined"
          name="password"
          required
          value={userLogin?.password}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Typography sx={{ textAlign : 'right' }} >
            <Link to="/register"  style={{ textDecoration : "underline" , color : "#1976d2" ,  }} >
            Don't Have An Account ? Create One
            </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default Login