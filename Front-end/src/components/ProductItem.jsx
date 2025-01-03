import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../contexts/ShopContext'

const ProductItem = ({id, image, name, price}) => {

  const {currency} = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img className='hover:scale-110 transition ease-in-out-5s' src={image[0]} alt="" />
        <p className='py-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
      </div>
    </Link>
  )
}

export default ProductItem