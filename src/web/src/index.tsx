import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Authorziation from './components/auth/Auth.components';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/auth' element={<Authorziation />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// todo: Сделать нормальную редирекцию (с history)