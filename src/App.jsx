import React from "react";
import Header from './components/Header'
import Product from './components/Product'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home'
import CartList from "./components/CartList";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
         <Route path="/cart" element={<CartList />} />
      </Routes>
    </div>
  );  
};

export default App;