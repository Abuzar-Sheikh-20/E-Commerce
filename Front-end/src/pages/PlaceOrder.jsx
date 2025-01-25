import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../contexts/ShopContext'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between  gao-4 sm:pt-14 pt-5 min-h-[80vh] border-t'>

{/* ------------------------ Left Side ------------------------  */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl my-3 sm:text-2xl">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className="flex gap-3">
          <input className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type="text" placeholder='First Name' required />
          <input className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type="text" placeholder='Last Name' />
        </div>
          <input className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type="email" placeholder='Email Address:' />
          <input className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type="text" placeholder='Street'required />
        <div className="flex gap-3">
          <input className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type="text" placeholder='City' required/>
          <input className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type="text" placeholder='State' required/>
        </div>
        <div className="flex gap-3">
          <input className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type="Number" placeholder='Zipcode' required/>
          <input className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type="text" placeholder='Country' />
        </div>
        <input className='border border-gray-300 rounded px-3.5 py-1.5 w-full' type="Number" placeholder='Phone' required/>

      </div>
      

{/* ------------------------ Right Side ------------------------  */}

    <div className='mt-8'>
      <div className='mt-8 min-w-80'>
        <CartTotal />
      </div>
{/* ------------------------ Payment Method Selection ------------------------  */}
    <div className='mt-12'>
      <Title text1={'PAYMENT'} text2={'METHOD'} />


      <div className="flex flex-col gap-4 lg:flex-row">
        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border py-2 px-3 cursor-pointer'>
        <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-700' : ''}`}></p>
        <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
        </div>
        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border py-2 px-3 cursor-pointer'>
          <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-700' :  ''}`} ></p>
          <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
        </div>
        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border py-2 px-3 cursor-pointer'>
          <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-700' :  ''}`} ></p>
          <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
        </div>
      </div>

      <div className="text-end w-full mt-8">
        <button onClick={() => navigate('/orders')} className='bg-black text-white px-16 py-2 text-sm'>PLACE ORDER</button>
      </div>
    </div>
    </div>

    </div>
  )
}

export default PlaceOrder
