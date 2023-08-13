import React from 'react'

const Loader = () => {
    return (
        <div className='flex h-screen gap-4 items-center justify-center'>
            <div className='w-7 h-7 bg-[var(--primary)] rounded-full animate-ping'></div>
            <div className='w-7 h-7 bg-[var(--primary)] rounded-full animate-ping'></div>
            <div className='w-7 h-7 bg-[var(--primary)] rounded-full animate-ping'></div>
        </div>
    )
}

export default Loader
