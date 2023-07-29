import React, { useEffect, useState } from 'react'

const Student = (props) => {

  const newName = (name) => {
    const splited = name.split(" ")
    const [fName, ...lName] = splited
    return (
      <span className='abel text-xl'>{fName}<br />{lName.join(" ")}</span>
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
    <div className='w-full rounded-lg border-2 border-gray-400 flex items-center justify-between px-4'>
      <div className='flex items-center gap-3'>
        <h1 className='text-2xl border-gray-300 h-full border-r pr-2'>{props.roll}</h1>
        <h1>{newName(props.name)}</h1>
      </div>
      {
        <label htmlFor={props.id} className={`${props.presentStudents.includes(props.name) ? 'bg-green-400' : 'bg-gray-200'} rounded-full h-6 w-6 shadow-inner shadow-gray-500`}></label>
      }
      <input type="checkbox" name="present" id={props.id} className='hidden' onChange={handleCheck} />
    </div>
  )
}

export default Student
