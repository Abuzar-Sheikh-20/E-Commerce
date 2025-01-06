import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../contexts/ShopContext';
import Title from './Title'
import ProducItem from './ProductItem'

const RelatedProducts = ({category, subCategory}) => {

  const {products} = useContext(ShopContext);
  const [related, setRelated] = useState([]);


  useEffect(() => {

    if (products.length > 0) {

      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

      setRelated(productsCopy.slice(0,5));

    }
  }, [products])

  return (
    <div className='mt-24'>
      <div className="py-2 text-3xl text-center">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-2 gap-y-6">
        {
          related.map((item, index) => (
            <ProducItem key={index} name={item.name} price={item.price} id={item._id} image={item.image}/>
          ))
        }

      </div>
      
    </div>
  )
}

export default RelatedProducts