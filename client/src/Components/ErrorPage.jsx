import React from 'react'
// import error2 from '../assets/error2.svg'

const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center max-w-5xl px-6 bg-teal-300'>
      <img src={''} alt="error" />
      <p className="text-2xl">Something went wrong !</p>
      <button className='px-8 rounded-lg py-2 bg-[var(--primary)] text-white'>Back to Home</button>
    </div>
  )
}

export default ErrorPage
