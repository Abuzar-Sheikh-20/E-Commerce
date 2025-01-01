import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
  return (
    <>
    <div className='flex flex-col grid sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>     {/* Column 1 will be three times wider than Column 2 and Column 3 */}
      <div>
        <img className='mb-5 w-32' src={assets.logo} alt="" />
        <p className='w-full md:w-2/3 text-gray-600'>
          Forever is a dynamic e-commerce brand offering a wide selection of high-quality products. With exceptional customer service and a seamless shopping experience, Forever is your go-to destination for lasting satisfaction
        </p>
      </div>

      <div>
        <p className="text-xl mb-5 font-medium">COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Private Policy</li>
        </ul>
      </div>

      <div>
        <p className="text-xl mb-5 font-medium">GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>+91 142 143 1423</li>
          <li>love@forever.com</li>
        </ul>
      </div>

    </div>
    
      <div>
        <hr />
        <p className='w-full py-5 text-center text-sm'>Copyright 2024@ forever.com - All Right Reserved.</p>
      </div>
    </>
  )
}

export default Footer
