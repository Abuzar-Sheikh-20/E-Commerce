import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import Verify from './pages/Verify'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Searchbar from './components/Searchbar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// export const backend_url = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />                {/* firstly, this component will render, then go to route '/' means Home.jsx, then go to Home.jsx */}
      <Searchbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/collection' element={<Collection />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
        <Route path='/place-order' element={<PlaceOrder />}></Route>
        <Route path='/product/:productId' element={<Product />}></Route>
        <Route path='/verify' element={<Verify />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
