import { BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Home from "./Components/Home/Home";
import SingleProduct from "./Components/Single Products/SingleProduct";
import Header from "./Components/Header/Header";
// import NewsLetter from "./Components/NewsLetter/NewsLetter";
import Footer from "./Components/Footer/Footer";
import CategoryProd from "./Components/CategoryProducts/CategoryProd";
import UserRegistration from "./Components/Authenication/UserRegistration";
import Login from "./Components/Authorization/Login";
import LogoutPage from "./Components/LogoutPage";
import WishList from "./Components/Wishlist/WishList";
import Success from "./Components/PaymentSucess/Success";
import Failure from "./Components/PaymentSucess/Failure";
import UserOrder from "./Components/Order/UserOrder";
// import Cart from "./Components/Cart/Cart";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/category/:id" element={<CategoryProd/>}/>
        <Route path="/product/:id" element={<SingleProduct/>}/>
        <Route path="/register" element={<UserRegistration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<LogoutPage/>}/>
        <Route path="/wishlist" element={<WishList/>}/>
        <Route path="/api/payment/success/:id" element={<Success/>}/>
        <Route path="/api/payment/failure/:id" element={<Failure/>}/>
        <Route path="/api/user/order" element={<UserOrder/>}/>
      </Routes>
      {/* <NewsLetter/> */}
      <Footer/>
    </Router>
  );
}

export default App;
