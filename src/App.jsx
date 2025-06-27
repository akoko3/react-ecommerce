import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail.jsx";
import Navbar from "./components/Navbar.jsx";
import ProductList from "./components/product/ProductList.jsx.jsx";
import Cart from "./components/cart/Cart.jsx";
import Login from "./components/users/Login.jsx";
import ToastNotification from "./components/ToastNotification.jsx";



const App = () => {
    return (
          <>
            <Navbar />
            <ToastNotification
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              
              />
            <Routes>
             
                <Route path="/" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
            </Routes>
          </>
    );
};

export default App;

