import React from 'react'

const ReportBox = ({subject,total,attended,percent}) => {
  return (
    <div className='bg-[var(--primary)] rounded-lg w-28'>
      <p className='text-white text-center text-xs pt-1 pb-[2px]'>{subject}</p>
      <div className="rounded-md bg-white text-black p-2 ml-[2px] mr-[2.5px] mb-[2px]">
        {/* <p className='text-xl font-semibold'>{(attended/total*100).toFixed(1)}%</p> */}
        <p className='text-xl font-semibold'>{percent}</p>
        <p className={`text-xs ${!attended&&'opacity-0'}`}> {attended}/{total}</p>
      </div>
    </div>
  )
}

export default ReportBox
