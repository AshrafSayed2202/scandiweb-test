import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
      <footer>
        <p>Scandiweb Test assignment <br />
          © Copyright ©2024 All rights reserved | This website is made by <a href='https://www.linkedin.com/in/ashraf-sayed22/' target='_blanc'>Ashraf Sayed</a>
        </p>
      </footer>
    </Router>
  );
};

export default App;
