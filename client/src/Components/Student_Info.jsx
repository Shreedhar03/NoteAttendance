import React, { useState } from 'react'
import ReportBox from './ReportBox'
import { useNavigate } from 'react-router-dom'

const Student_Info = () => {
    const navigate=useNavigate()
    const [record, setRecord] = useState({
        roll: window.location.href.split("/").slice(-1)[0],
        name: "Bade Akshay Bhagwan",
        totalLectures: 18,
        totalLecturesAttended: 13,
        totalPracticals: 18,
        totalPracticalsAttended: 15,
        theoryDistribution:
            [
                { subject: "DBMS", total: 18, attended: 17 },
                { subject: "SPOS", total: 18, attended: 4 },
                { subject: "CN", total: 18, attended: 10 },
                { subject: "EL1", total: 18, attended: 8 },
                { subject: "TOC", total: 18, attended: 18 },
            ],
    })
    return (
        <div className='flex flex-col bg-slate-10 px-6 my-6'>
            <button className='self-start text-3xl text-gray-700' onClick={()=>navigate('/search')}>&larr;</button>
            <h1 className='text-xl font-semibold text-[var(--primary)] mt-4'>{record.roll}</h1>
            <h1 className='abel text-2xl'>{record.name}</h1>
            <div className='flex justify-between mt-4 border-2 border-gray-400 rounded-lg p-3'>
                <div className='border-r-2 w-1/2 pr-3 border-gray-400'>
                    <p className='text-sm'>OVERALL</p>
                    <h1 className='text-6xl font-extrabold text-[#008000]'>78%</h1>
                    <p className=''>24/38</p>
                </div>
                <div className='w-1/2 pl-3'>
                    <h1 className='text-sm'>THEORY</h1>
                    <p><span className='text-3xl'>84%</span><span className='text-lg text-gray-600 ml-1'>12/18</span></p>
                    <h1 className='mt-2 text-sm'>LABS</h1>
                    <p><span className='text-3xl'>84%</span><span className='text-lg text-gray-600 ml-1'>12/18</span></p>
                </div>
            </div>
            <div className='mt-4'>
                <p className='uppercase text-sm text-gray-700'>theory distribution</p>
                <div className='flex gap-3 flex-wrap mt-4'>
                    {
                        record.theoryDistribution.map((e, key) => {
                            return (
                                <ReportBox subject={e.subject} attended={e.attended} total={e.total} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Student_Info
