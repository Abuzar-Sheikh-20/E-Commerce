import React, { useContext } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import { assets } from '../assets/assets';

const Searchbar = () => {

  const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);

  return showSearch ? (
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
