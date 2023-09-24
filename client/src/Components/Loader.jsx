import React from 'react'

const Loader = () => {
    return (
        <div className='flex h-screen gap-4 items-center justify-center'>
            <div className='w-9 h-9 border-t-4 border-r-4 border-4 border-t-[var(--primary)] border-r-[var(--primary)] border-white  rounded-full animate-spin'></div>
            {/* <div className='w-7 h-7 border-t-2 border-2 border-t-[var(--primary)] border-white  rounded-full animate-spin'></div> */}
            {/* <div className='w-7 h-7 border-t-2 border-2 border-t-[var(--primary)] border-white  rounded-full animate-spin'></div> */}
        </div>
    )
}

export default Loader
