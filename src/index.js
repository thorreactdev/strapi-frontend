import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import AppContext from "./utils/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContext>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        // width= "400px"
      />
      <App />
    </AppContext>
  </React.StrictMode>
);
