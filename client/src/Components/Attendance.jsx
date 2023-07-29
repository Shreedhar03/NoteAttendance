import React, { useState } from 'react'
import Navbar from './Navbar'
import StudentList from './StudentList'
import grid from '../assets/grid.svg'
import list from '../assets/list.svg'
import StudentGrid from './StudentGrid'
const students = [
    { "rollNo": "01", "fullName": "Michael Isabella Williams" },
    { "rollNo": "02", "fullName": "Daniel Grace Garcia" },
    { "rollNo": "03", "fullName": "Emma Christopher Johnson" },
    { "rollNo": "04", "fullName": "Olivia Grace Davis" },
    { "rollNo": "05", "fullName": "James Thomas Smith" },
    { "rollNo": "06", "fullName": "Michael Ava Martinez" },
    { "rollNo": "07", "fullName": "Olivia Joseph Wilson" },
    { "rollNo": "08", "fullName": "David Isabella Jones" },
    { "rollNo": "09", "fullName": "John William Brown" },
    { "rollNo": "10", "fullName": "Emily Thomas Johnson" },
    { "rollNo": "11", "fullName": "Daniel Grace Davis" },
    { "rollNo": "12", "fullName": "Emma Mark Smith" },
    { "rollNo": "13", "fullName": "Michael Sophia Martinez" },
    { "rollNo": "14", "fullName": "David Joseph Wilson" },
    { "rollNo": "15", "fullName": "Sarah Grace Garcia" },
    { "rollNo": "16", "fullName": "James Ava Johnson" },
    { "rollNo": "17", "fullName": "Alice Christopher Davis" },
    { "rollNo": "18", "fullName": "Michael Elizabeth Smith" },
    { "rollNo": "19", "fullName": "Daniel Grace Williams" },
    { "rollNo": "20", "fullName": "Olivia Mark Brown" },
    { "rollNo": "21", "fullName": "David Ava Garcia" },
    { "rollNo": "22", "fullName": "Emma Joseph Davis" },
    { "rollNo": "23", "fullName": "John Isabella Miller" },
    { "rollNo": "24", "fullName": "Sarah William Wilson" },
    { "rollNo": "25", "fullName": "Daniel Mark Smith" },
    { "rollNo": "26", "fullName": "Michael Sophia Davis" },
    { "rollNo": "27", "fullName": "Emma Christopher Martinez" },
    { "rollNo": "28", "fullName": "Olivia Joseph Johnson" },
    { "rollNo": "29", "fullName": "David Isabella Williams" },
    { "rollNo": "30", "fullName": "Sarah Grace Davis" },
    { "rollNo": "31", "fullName": "James Thomas Smith" },
    { "rollNo": "32", "fullName": "Daniel Grace Garcia" },
    { "rollNo": "33", "fullName": "Emma Joseph Johnson" },
    { "rollNo": "34", "fullName": "Michael Grace Davis" },
    { "rollNo": "35", "fullName": "Olivia Christopher Smith" },
    { "rollNo": "36", "fullName": "David William Johnson" },
    { "rollNo": "37", "fullName": "Emma Mark Martinez" },
    { "rollNo": "38", "fullName": "Olivia Sophia Wilson" },
    { "rollNo": "39", "fullName": "Daniel Isabella Brown" },
    { "rollNo": "40", "fullName": "Michael Grace Johnson" },
    { "rollNo": "41", "fullName": "David Mark Davis" },
    { "rollNo": "42", "fullName": "Emma Grace Garcia" },
    { "rollNo": "43", "fullName": "Olivia Christopher Smith" },
    { "rollNo": "44", "fullName": "James Joseph Johnson" },
    { "rollNo": "45", "fullName": "Daniel Ava Wilson" },
    { "rollNo": "46", "fullName": "Sarah William Davis" },
    { "rollNo": "47", "fullName": "Emma Mark Miller" },
    { "rollNo": "48", "fullName": "Michael Grace Wilson" },
    { "rollNo": "49", "fullName": "David Isabella Davis" },
    { "rollNo": "50", "fullName": "Emma Ava Smith" },
    { "rollNo": "51", "fullName": "Olivia Christopher Johnson" },
    { "rollNo": "52", "fullName": "James Sophia Brown" },
    { "rollNo": "53", "fullName": "Daniel Joseph Johnson" },
    { "rollNo": "54", "fullName": "Emma Grace Wilson" },
    { "rollNo": "55", "fullName": "Sarah Christopher Garcia" },
    { "rollNo": "56", "fullName": "Michael Isabella Davis" },
    { "rollNo": "57", "fullName": "David Ava Smith" },
    { "rollNo": "58", "fullName": "Olivia Joseph Martinez" },
    { "rollNo": "59", "fullName": "Daniel William Johnson" },
    { "rollNo": "60", "fullName": "Emma Grace Wilson" },
    { "rollNo": "61", "fullName": "Sarah Thomas Davis" },
    { "rollNo": "62", "fullName": "James Grace Smith" },
    { "rollNo": "63", "fullName": "Michael Ava Garcia" },
    { "rollNo": "64", "fullName": "David Joseph Davis" },
    { "rollNo": "65", "fullName": "Emma Grace Smith" },
    { "rollNo": "66", "fullName": "Olivia Mark Martinez" },
    { "rollNo": "67", "fullName": "Daniel Joseph Johnson" },
    { "rollNo": "68", "fullName": "Emma Isabella Brown" },
    { "rollNo": "69", "fullName": "Michael Mark Johnson" },
    { "rollNo": "70", "fullName": "Olivia Ava Wilson" },
    { "rollNo": "71", "fullName": "David Christopher Davis" },
    { "rollNo": "72", "fullName": "Sarah Joseph Smith" },
    { "rollNo": "73", "fullName": "Michael Sophia Martinez" },
    { "rollNo": "74", "fullName": "Daniel Grace Johnson" },
    { "rollNo": "75", "fullName": "Emma Ava Davis" },
    { "rollNo": "76", "fullName": "Olivia Joseph Smith" },
    { "rollNo": "77", "fullName": "David Isabella Brown" },
    { "rollNo": "78", "fullName": "Emma Mark Garcia" },
    { "rollNo": "79", "fullName": "James Ava Davis" }
  ]
  
const Attendance = () => {
    const [gridView, setGridView] = useState(true)
    const [presentStudents, setPresentStudents] = useState([])
    const [navShodow, setNavShodow] = useState(false)
    const [selectAll, setSelectAll] = useState(true)
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
    return (
        <>
            <Navbar navShodow={navShodow} setNavShodow={setNavShodow} presentStudents={presentStudents} students={students} />
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
                <div className='self-end flex gap-1 mb-6'>
                    <button onClick={() => setGridView(!gridView)}><img src={!gridView ? grid : list} className='w-6 h-6' alt="" /></button>
                    <button className='border-2 border-gray-700 rounded-lg text-sm px-2 py-[2px]' onClick={handleSelectAll}>{selectAll ? 'Select All' : 'Reset'}</button>
                </div>
                {
                    gridView ?
                        <div className='flex flex-wrap gap-2'>
                            {students.map((s, key) => {
                                return (<StudentGrid name={s.fullName} key={key} roll={s.rollNo} id={key} setPresentStudents={setPresentStudents} presentStudents={presentStudents} />)
                            })}
                        </div>
                        :
                        students.map((s, key) => {
                            return (<StudentList name={s.fullName} key={key} roll={s.rollNo} id={key} setPresentStudents={setPresentStudents} presentStudents={presentStudents} />)
                        })
                }

            </section>
        </>
    )
}

export default Attendance
