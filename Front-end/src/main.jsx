import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './contexts/ShopContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>     {/* When App component starts render, ShopContextProvider is rendered correctly with the context values. */}
      <App />                 {/* Starts rendering then above . -------- then ti goes to the App.jsx*/}
    </ShopContextProvider>
  </BrowserRouter>,
)