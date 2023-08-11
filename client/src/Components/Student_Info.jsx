import React, { useContext, useEffect, useState } from 'react'
import ReportBox from './ReportBox'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

const Student_Info = () => {
    const navigate = useNavigate()
    const {checkAuthState} = useContext(AppContext)
    const [record, setRecord] = useState({
        roll: window.location.href.split("/").slice(-1)[0],
        name: "Bade Akshay Bhagwan",
        totalLectures: 100,
        totalLecturesAttended: 75,
        totalPracticals: 50,
        totalPracticalsAttended: 50,
        theoryDistribution:
            [
                { subject: "DBMS", total: 24, attended: 18 },
                { subject: "SPOS", total: 24, attended: 22 },
                { subject: "CN", total: 24, attended: 19 },
                { subject: "EL1", total: 24, attended: 18 },
                { subject: "TOC", total: 24, attended: 15 },
            ],
        practicalDistribution:
            [
                { subject: "DBMSL", total: 12, attended: 7 },
                { subject: "LP1", total: 12, attended: 12 },
                { subject: "CNSL", total: 14, attended: 12 },

            ],
    })
    const getPercent = (totalLectures, totalLecturesAttended, totalPracticals, totalPracticalsAttended) => {
        const total = (totalLecturesAttended + totalPracticalsAttended) / (totalLectures + totalPracticals) * 100
        return (
            total === 100 ? total : total.toFixed(1)
        )
    }
    useEffect(()=>{
        
    })
    const { totalLectures, totalLecturesAttended, totalPracticals, totalPracticalsAttended } = record
    return (
        <div className='flex flex-col bg-slate-10 px-6 my-6'>
            <button className='self-start text-3xl text-gray-700' onClick={() => navigate('/search')}>&larr;</button>
            <h1 className='text-xl font-semibold text-[var(--primary)] mt-4'>{record.roll}</h1>
            <h1 className='abel text-2xl'>{record.name}</h1>
            <div className='flex justify-between mt-4 border-2 border-gray-400 rounded-lg p-3'>
                <div className='border-r-2 w-1/2 pr-3 border-gray-400'>
                    <p className='text-sm'>OVERALL</p>
                    <h1 className='text-4xl font-extrabold text-[#008000] mt-2'>
                        {getPercent(totalLectures, totalLecturesAttended, totalPracticals, totalPracticalsAttended)}%
                    </h1>
                    <p className='mt-1'>{totalLecturesAttended + totalPracticalsAttended}/{totalLectures + totalPracticals}</p>
                </div>
                <div className='w-1/2 pl-3'>
                    <h1 className='text-sm'>THEORY</h1>
                    <p><span className='text-lg'>{(totalLecturesAttended / totalLectures * 100).toFixed(1)}%</span><span className='text-xs text-gray-600 ml-2'>{totalLecturesAttended}/{totalLectures}</span></p>
                    <h1 className='mt-2 text-sm'>LABS</h1>
                    <p><span className='text-lg'>{(totalPracticalsAttended / totalPracticals * 100).toFixed(1)}%</span><span className='text-xs text-gray-600 ml-2'>{totalPracticalsAttended}/{totalPracticals}</span></p>
                </div>
            </div>
            <div className='mt-8'>
                <p className='uppercase text-sm text-gray-700'>theory distribution</p>
                <div className='flex gap-3 flex-wrap mt-4'>
                    {
                        record.theoryDistribution.map((e, key) => {
                            return (
                                <ReportBox key={key} subject={e.subject} attended={e.attended} total={e.total} />
                            )
                        })
                    }
                </div>
            </div>
            <div className='mt-8'>
                <p className='uppercase text-sm text-gray-700'>practical distribution</p>
                <div className='flex gap-3 flex-wrap mt-4'>
                    {
                        record.practicalDistribution.map((e, key) => {
                            return (
                                <ReportBox key={key} subject={e.subject} attended={e.attended} total={e.total} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Student_Info
