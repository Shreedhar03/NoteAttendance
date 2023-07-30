import React from 'react'

const ReportBox = ({subject,total,attended}) => {
  return (
    <div className='bg-[var(--primary)] rounded-lg w-24'>
      <p className='text-white text-center text-xs pt-1 pb-[2px]'>{subject}</p>
      <div className="rounded-md bg-white text-black p-2 ml-[2px] mr-[2.5px] mb-[2px]">
        <p className='text-xl font-semibold'>{(attended/total*100).toFixed(1)}%</p>
        <p className='text-xs'>{attended}/{total}</p>
      </div>
    </div>
  )
}

export default ReportBox
