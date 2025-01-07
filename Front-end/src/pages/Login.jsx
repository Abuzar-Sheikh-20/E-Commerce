import React, { useState } from 'react'

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign Up');

  const onSubmitHandler = async (event) => {
    event.onPreventDefault();
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input className='w-full px-3 py-2 border border-gray-500' type="text" placeholder='Your Name' required />}
      <input className='w-full px-3 py-2 border border-gray-500' type="email" placeholder='Your Email' required />
      <input className='w-full px-3 py-2 border border-gray-500' type="password" placeholder='Your Password' required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login' ?
          <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create account</p> :
          <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
