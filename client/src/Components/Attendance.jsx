import React, { useState } from 'react'
import Navbar from './Navbar'
import Student from './Student'
const students = [
    { "rollNo": "01", "fullName": "John Christopher Smith" },
    { "rollNo": "02", "fullName": "Alice Ava Garcia" },
    { "rollNo": "03", "fullName": "Michael Isabella Johnson" },
    { "rollNo": "04", "fullName": "Emily Joseph Wilson" },
    { "rollNo": "05", "fullName": "David Grace Davis" },
    { "rollNo": "06", "fullName": "Sarah Thomas Brown" },
    { "rollNo": "07", "fullName": "Daniel Sophia Smith" },
    { "rollNo": "08", "fullName": "Emma William Garcia" },
    { "rollNo": "09", "fullName": "James Mark Martinez" },
    { "rollNo": "10", "fullName": "Olivia Elizabeth Johnson" },
    { "rollNo": "11", "fullName": "Michael Ava Williams" },
    { "rollNo": "12", "fullName": "Sarah Thomas Jones" },
    { "rollNo": "13", "fullName": "Daniel Sophia Johnson" },
    { "rollNo": "14", "fullName": "Olivia Grace Miller" },
    { "rollNo": "15", "fullName": "David Ava Davis" },
    { "rollNo": "16", "fullName": "Michael Grace Garcia" },
    { "rollNo": "17", "fullName": "Emma Joseph Davis" },
    { "rollNo": "18", "fullName": "James Thomas Smith" },
    { "rollNo": "19", "fullName": "Alice Elizabeth Miller" },
    { "rollNo": "20", "fullName": "Sarah Isabella Martinez" }
]
const Attendance = () => {
    const [presentStudents,setPresentStudents] = useState([])
    const [navShodow, setNavShodow] = useState(false)
    const [selectAll,setSelectAll]=useState(true)
    window.addEventListener("scroll", () => {
        let positionY = window.pageYOffset
        if (positionY > 95) {
            setNavShodow(true)
        }
        else {
            setNavShodow(false)
        }
    })
    const handleSelectAll=()=>{
        if(selectAll){
            let selectAll = students.map(stud=>stud.fullName)
            console.log(selectAll)
            setPresentStudents(selectAll)
            setSelectAll(false)
        } else{
            setPresentStudents([])
            setSelectAll(true)
        }
    }
    return (
        <>
            <Navbar navShodow={navShodow} setNavShodow={setNavShodow} presentStudents={presentStudents} students={students}/>
            <div className='flex items-center gap-6 mt-4 px-6'>
                <div className='relative flex items-center justify-center gap-1 border-2 border-black rounded-t-lg h-[60PX] w-20'>
                    <h2 className='text-[45px] font-semibold text-[var(--primary)]'>A</h2>
                    <div className='flex flex-col items-end'>
                        <p className='text-sm h-4'>T2</p>
                        <p className='text-lg font-semibold h-7'>BE</p>
                    </div>
                    <div className="absolute bg-black text-white text-xs w-20 py-1 -bottom-5 rounded-b-lg text-center">27 Jul 23</div>
                </div>
                <h2 className='text-3xl font-semibold'>DBMSL</h2>
            </div>
            <section className='my-8 flex flex-col gap-3 px-6'>
                <button className='self-end border-2 border-gray-300 rounded-lg px-2 py-1' onClick={handleSelectAll}>{selectAll ? 'Select All' : 'Reset'}</button>
                {
                    students.map((s, key) => {
                        return (<Student name={s.fullName} key={key} roll={s.rollNo} id={key} setPresentStudents={setPresentStudents} presentStudents={presentStudents}/>)
                    })
                }

            </section>
        </>
    )
}

export default Attendance
