import React from 'react'

const Year = (props) => {
  return (
    <div className='p-5 rounded-xl border-2 border-black my-6'>
        <h1 className='text-[var(--primary)] font-semibold text-2xl'>{props.year}</h1>
        <div className="grid grid-cols-2 gap-4 mt-4">
            {
                props.divisions.map((div,key)=>{
                    return(
                        <div key={key} className='flex items-center gap-2 border-2 border-black rounded-lg p-2'>
                            <h3 className='text-5xl font-normal'>{div.division}</h3>
                            <div className='flex flex-col'>
                                <p className='h-5 text-xl'>{div.count}</p>
                                <p className='text-lg text-gray-700'>{div.subject}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Year
