import React from 'react'
import checked from '../assets/checked.svg'
import { useNavigate } from 'react-router-dom'

const StudentList = (props) => {
  const navigate=useNavigate()

  const newName = (name) => {
    const splited = name.split(" ")
    const [fName, ...lName] = splited
    return (
      <div className='flex flex-col'>
        <span className='abel text-xl h-6'>{fName}</span>
        <span className='abel text-xl'>{lName.join(" ")}</span>
      </div>
    )
  }
  const handleCheck = () => {
    if (props.presentStudents.includes(props.name)) {
      props.setPresentStudents(props.presentStudents.filter(e => e !== props.name))
    } else {
      props.setPresentStudents([...props.presentStudents, props.name])
    }
  }

  return (
    <div className={`w-full rounded-lg border-2 border-gray-300 flex items-center justify-between px-4
     ${!props.check && 'cursor-pointer'}`} onClick={()=>!props.check && navigate(`/student-info/${props.roll}`)}>
      <div className='flex items-center gap-3'>
        <h1 className='text-2xl border-gray-300 h-full border-r-2 w-12'>{props.roll.slice(4)}</h1>
        <h1>{newName(props.name)}</h1>
      </div>
      {
        props.check &&
        <label htmlFor={props.id} className={`${'bg-gray-200'} rounded-full h-6 w-6 shadow-inner shadow-gray-500`}>
          {props.presentStudents.includes(props.name) && <img src={checked} />}
        </label>
      }
      {
      props.check && <input type="checkbox" name="present" id={props.id} className='hidden' onChange={handleCheck} />
      }
    </div>
  )
}

export default StudentList
