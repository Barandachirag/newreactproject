import logo from './logo.svg';
import './App.css';
import Header from './common component/Header'
import '../src/common component/Header.css'
import { BrowserRouter, Route, Routes , Navigate } from 'react-router-dom';
import Home from './common component/Home';
import { Card, Carousel } from 'react-bootstrap';
import Contact from './common component/Contact';
//import Categories from './component/Categories';
import { CartProvider } from './contexts/CartProvider';
import Cart from './contexts/Cart';
import Signup from './component/Signup/Signup';
import Login from './component/login/Login';
import { AuthProvider } from './component/Signup/AuthContext';
import Footer from './common component/Footer';
import ShopDetails from './common component/ShopDetails';
import Shop from './common component/Shop'
import Logout from './component/logout/Logout';





function App() {
  return (
    <div >
      <BrowserRouter>
      <AuthProvider>
      <CartProvider>  
      <Header /> 
     
      {/* <Card /> */}
      {/* <Categories /> */}
     
      <Routes>
      <Route path="/" element={<Navigate to="/Signup" />} />
        <Route path='/Home' element ={<Home />} > </Route>
        <Route path='/contact' element ={<Contact />} > </Route>
        <Route path="/cart" element={<Cart />} ></Route>
        <Route path="/Shop" element={<Shop />} ></Route>
        <Route path="/ShopDetails" element={<ShopDetails />} />
        <Route path='/Signup' element={<Signup />}>Signup</Route>
         <Route path='/Login' element={<Login />}></Route>
         <Route path='/Logout' element={<Logout />}></Route>
         
      </Routes>
      <Footer />
      </CartProvider>
      </AuthProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
