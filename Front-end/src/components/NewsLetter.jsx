import React from 'react'

const NewsLetter = () => {

  const onSubmitHandler = (event) => {      // and now, after submit, The page is not going on loading.
    event.preventDefault();
  }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscibe Us and get 20% discount</p>
      <p className='text-gray-400 mt-3'></p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 border pl-3 flex mx-auto my-6 items-center'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter you Email here...' required />
        <button className='py-4 px-10 bg-black text-white rounded-md text-xs'>Submit</button>
      </form>
    </div>
  )
}

export default NewsLetter
