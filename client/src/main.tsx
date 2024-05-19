import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
