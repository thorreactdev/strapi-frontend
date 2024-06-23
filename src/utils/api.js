import axios from "axios";

const API_TOKEN =
  "25d1eb95db32dac599bc42df7cc85b8e374695245bc250cf7f54256beaa1ca9dcfb1086fe7fadf19a6513f5c1c8de8d29689908d81260aff2187667f55dd6420ddbfb8fc7be488391a72ff8e47af8a73e7237aad7c8d786744a8369c888a10af2aa4882c6825eced0e6572ab47c75c7bba4057483ae4f71d2ee433cd1ac88aa0";

//Server base url for the data fetching
export const baseURL = "https://strapi-backend-6ewy.onrender.com";

export const fetchDataFromApi = async (url) => {
  try {
    const response = await fetch(`${baseURL}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${API_TOKEN}`,
      },
    });

    const { data } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const makePayment = axios.create({
  baseURL : baseURL,
  headers :{
    Authorization : `bearer ${API_TOKEN}`
  }
});