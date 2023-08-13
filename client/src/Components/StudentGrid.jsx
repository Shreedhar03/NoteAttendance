import React, { useContext, useEffect } from 'react'
import { AppContext } from '../App'

const StudentGrid = (props) => {
    const {presentStudents,setPresentStudents}=useContext(AppContext)

    const handleCheck = () => {
        if (props.name === null) {
            return
        }
        if (presentStudents.includes(props.roll)) {
            setPresentStudents(presentStudents.filter(e => e !== props.roll))
        } else {
            setPresentStudents([...presentStudents, props.roll])
        }
    }

    return (
        <>
            {
                <label htmlFor={props.id} className={`${presentStudents.includes(props.roll) ? 'bg-green-500' : 'bg-gray-100'} ${props.name === null && 'bg-white border-slate-200 border'} rounded-lg text-xl h-12 w-12 flex items-center justify-center`}>
                    {props.roll.slice(4)}
                </label>
            }
            <input type="checkbox" name="present" id={props.id} className='hidden' onChange={handleCheck} />
        </>
    )
}

export default StudentGrid
