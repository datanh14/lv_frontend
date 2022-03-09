import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';
import Routes from './modules/router/Routers';
// import Routes from '@modules/router/Routers';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
