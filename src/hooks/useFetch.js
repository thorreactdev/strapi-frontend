import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";

export const useFetch = (endpoint) =>{
    const[data ,setData] = useState(null);

    const makeApiCall = async() =>{
        const res = await fetchDataFromApi(endpoint);
        console.log(res);
        setData(res);
    }
    useEffect(()=>{
        makeApiCall();
    },[endpoint]);

    return { data };
}