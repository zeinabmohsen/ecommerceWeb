import './App.css';
import HomePage from './pages/HomePage';
import Footer from './components/general/footer'
import  Navbar  from './components/general/Navbar'
import Shop from './pages/ShopPage'
import Auth from './pages/AuthPage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProductDetails from './pages/ProductDetails';
import Cartpage from './pages/Cartpage';
import Checkout from './pages/checkoutPage'
import SignUp from './components/Auth/signUp';



function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route index element= {<HomePage/>}/>
        <Route path="/login" element={<Auth/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/products" element={<Shop/>}/>
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cartpage/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

export default App;
