import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import LoginForm from './login';
import Products from './pages/Products';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/products' element={<Products />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;