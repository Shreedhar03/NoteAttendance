import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import StudentList from './StudentList'
import grid from '../assets/grid.svg'
import list from '../assets/list.svg'
import StudentGrid from './StudentGrid'
import { AppContext } from '../App'
import Dialog from './Dialog'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Attendance = () => {
    const goto = useNavigate()
    const { students, setStudents, formValues } = useContext(AppContext)
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [gridView, setGridView] = useState(true)
    const [presentStudents, setPresentStudents] = useState([])
    const [navShodow, setNavShodow] = useState(false)
    const [selectAll, setSelectAll] = useState(true)

    const fetchStudents = async () => {
        try {
            console.log(formValues)
            const { data } = await axios.get(`http://localhost:8080/api/get_students`,
                { params: formValues }
            )
            setStudents(data.students)
            // console.log(students)
        } catch (err) {
            console.log(err)
        }
    }
    window.addEventListener("scroll", () => {
        let positionY = window.pageYOffset
        if (positionY > 95) {
            setNavShodow(true)
        }
        else {
            setNavShodow(false)
        }
    })
    const handleSelectAll = () => {
        if (selectAll) {
            let selectAll = students.map(stud => stud.fullName)
            console.log(selectAll)
            setPresentStudents(selectAll)
            setSelectAll(false)
        } else {
            setPresentStudents([])
            setSelectAll(true)
        }
    }
    const handleCancel = () => {
        goto('/selection')
    }
    const handleContinue = () => {
        setDialog(false)
    }
    useEffect(() => {
        fetchStudents()
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])
    return (

        <>
            {
                loading ?
                    <div className='flex h-screen gap-4 items-center justify-center'>
                        <div className='w-7 h-7 bg-[var(--primary)] rounded-full animate-ping'></div>
                        <div className='w-7 h-7 bg-[var(--primary)] rounded-full animate-ping'></div>
                        <div className='w-7 h-7 bg-[var(--primary)] rounded-full animate-ping'></div>
                    </div>
                    :
                    <>
                        <Navbar navShodow={navShodow} setNavShodow={setNavShodow} presentStudents={presentStudents} students={students} />
                        <div className={`flex items-center gap-6 mt-4 px-6 ${dialog && 'opacity-20'}`}>
                            <div className='relative flex items-center justify-center gap-1 border-2 border-black rounded-t-lg h-[60px] w-20'>
                                <h2 className='text-[45px] font-semibold text-[var(--primary)]'>A</h2>
                                <div className='flex flex-col items-end'>
                                    <p className='text-sm h-4'>T2</p>
                                    <p className='text-lg font-semibold h-7'>BE</p>
                                </div>
                                <div className="absolute bg-black text-white text-xs w-20 py-1 -bottom-5 rounded-b-lg text-center">27 Jul 23</div>
                            </div>
                            <h2 className='text-3xl font-semibold'>DBMSL</h2>
                        </div>
                        <section className={`my-8 flex flex-col gap-3 px-6 ${dialog && 'opacity-20'}`}>
                            <div className='self-end flex gap-1 mb-6'>
                                <button onClick={() => setGridView(!gridView)}><img src={!gridView ? grid : list} className='w-6 h-6' alt="" /></button>
                                <button className='border-2 border-gray-700 rounded-lg text-sm px-2 py-[2px]' onClick={handleSelectAll}>{selectAll ? 'Select All' : 'Reset'}</button>
                            </div>
                            {
                                gridView ?
                                    <div className='grid grid-cols-6 gap-3'>
                                        {students?.map((s, key) => {
                                            return (<StudentGrid name={s.name} key={key} roll={s.roll} id={key} setPresentStudents={setPresentStudents} presentStudents={presentStudents} />)
                                        })}
                                    </div>
                                    :
                                    students.map((s, key) => {
                                        return (<StudentList name={s.name} key={key} roll={s.roll} id={key} setPresentStudents={setPresentStudents} presentStudents={presentStudents} check={true} />)
                                    })
                            }

                        </section>
                        <Dialog message="Attendance for this date already exists. Do you wish to continue"
                            dialog={dialog}
                            handleCancel={handleCancel}
                            handleContinue={handleContinue} />
                    </>
            }
        </>



    )
}

export default Attendance
