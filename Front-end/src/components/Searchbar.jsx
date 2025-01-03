import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {

  const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
  const [visible, setVisible] = useState(false);      
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')){      

    {/* So, the story start like this---> location.pathname gives current URL and if there's collection includes in that URL, the 'visible is set to the True and if not then False. and return function checks if the visible and showSearch is True then return all otherwise not. So, it means if visible is false then searchBar will be hidden and if 'collection' is not included in pathname then it will be hidden. */}

      setVisible(true);
    }
    else {
      setVisible(false);
    }

  })


  return showSearch && visible ? (
    <div className='border border-b bg-gray-50 text-center'>
      <div className='inline-flex justify-center items-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={((e) => setSearch(e.target.value))} className='bg-inherit text-sm flex-1 outline-none' type="text" placeholder='Search'/>
        <img className='w-4' src={assets.search_icon} alt="" />
      </div>
      <img onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
      
    </div>
  ) : null
}

export default Searchbar
