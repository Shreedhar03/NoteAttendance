import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import axios from 'axios'

const Navbar = (props) => {
  const date = props.date.getDate().toString()
  const month = (props.date.getMonth() + 1).toString()
  const reqDate = month < 10 ? date + '/0' + month : date + '/' + month
  const { presentStudents, setPresentStudents, formValues, overwrite } = useContext(AppContext)
  const navigate = useNavigate()
  const handleSubmit = async () => {
    console.log("ok")
    try {
      let { data } = await axios.post(`http://localhost:8080/api/mark_attendance2`, {
        formValues, presentStudents, reqDate, overwrite
      })
      navigate('/feedback')
      setPresentStudents([])
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <nav className={`sticky top-0 bg-white z-10 px-6 ${props.navShodow && 'drop-shadow-xl'} transition-all flex items-center justify-between gap-3 py-4`}>
      <h2 className={`${props.navShodow ? 'opacity-100' : 'opacity-0'} transition-opacity text-lg font-semibold`}>{formValues.subject}</h2>
      <div className='flex items-center gap-3'>
        <p>{props.presentStudents?.length}/{props.students?.length}</p>
        <button className='rounded-lg bg-[var(--primary)] px-2 py-1 text-white' onClick={handleSubmit}>Done</button>
      </div>
    </nav>
  )
}

export default Navbar
