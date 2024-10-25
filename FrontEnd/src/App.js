import React, { useState } from 'react';
import { ReactDOM } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Layout from './components/Layout';
import Home from './pages/Home';
import Product from './pages/Product';
//import Contact from './pages/Contact';
import MyAccount from './pages/MyAccount';

import Whatsnew from './pages/Whatsnew';
import Special from './pages/Special';
import ObjectDetails from './pages/ObjectDetails';
import Cart from './pages/Cart';



function App() { 
  const [cart, setCart] = useState([]); 
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="my-account" element={<MyAccount />} />
            <Route path="whatsnew" element={<Whatsnew />} />
            <Route path="special" element={<Special />} />
            <Route path="/product/:ObjectId" element={<ObjectDetails />} />
            <Route path="/product/:ObjectId" element={<Home />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
            
          </Route>
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
