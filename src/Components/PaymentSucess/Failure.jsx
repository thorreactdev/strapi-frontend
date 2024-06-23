import React from 'react'
import {Link, useParams} from "react-router-dom"
import { Button, Typography, capitalize } from "@mui/material";
import "./Failure.scss";

const Failure = () => {
  const { id } = useParams();
  console.log(id); 
  return (
    <div className='main-failure'>
      <div className='wrapper-failure'>
    <iframe src='https://lottie.host/embed/681ea98b-0f6a-45cf-8a2a-bc8296c30b14/E7XVjJmgpr.json' title='error' className='failure-image'></iframe>
    <Typography variant='h6' fontWeight={700}>
      We are unable to process your payment!!
    </Typography>
    <Typography variant='subtitle' width={500} textAlign={'center'} textTransform={"capitalize"}>
      There might be some netwrok issue or , try to contact your payment provider for further details or try again later
    </Typography>
    <Link to="/">
    <Button variant='contained' sx={{ mt : 2}}>
      Return To Home
    </Button>
    </Link>
      </div>
    </div>
  )
}

export default Failure