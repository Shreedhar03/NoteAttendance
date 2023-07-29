import React from 'react'
import feedback from '../assets/feedback.svg'
const Feedback = () => {
    return (
        <section className='flex flex-col items-center px-6 h-screen justify-center gap-12'>
            <div className='flex flex-col items-center gap-2'>
                <img src={feedback} alt="feedback" />
                <h1 className='text-4xl font-semibold mt-8'>DBMSL</h1>
                <h2 className='abel text-2xl font-semibold'>Attendance Updated</h2>
            </div>
            <button className='bg-[var(--primary)] p-4 w-full mt-8 rounded-lg text-white'>Back to Home</button>
        </section>

    )
}

export default Feedback
