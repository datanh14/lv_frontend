import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Candidate from './pages/Candidate';
import LoginForm from './login';
import Search from './pages/Search';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/candidate' element={<Candidate/>} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;