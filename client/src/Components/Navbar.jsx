import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import axios from 'axios'

const Navbar = (props) => {
  const date = props.date.getDate().toString()
  const month = (props.date.getMonth() + 1).toString()
  const reqDate = month < 10 ? date + '/0' + month : date + '/' + month
  const { presentStudents, setPresentStudents, formValues, overwrite, setSubmitted } = useContext(AppContext)
  const navigate = useNavigate()
  const handleSubmit = async () => {
    navigate('/feedback')
    console.log("ok")
    try {
      let { data } = await axios.post(`http://localhost:8080/api/mark_attendance`, {
        ...formValues, presentStudents, reqDate, overwrite
      })
      setPresentStudents([])
      localStorage.removeItem('presentStudents')
      setSubmitted(true)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <nav className={`sticky top-0 bg-white z-20 px-6 ${props.navShodow && 'drop-shadow-2xl'} transition-all flex items-center justify-between gap-3 py-4`}>
      <h2 className={`${props.navShodow ? 'opacity-100' : 'opacity-0'} transition-opacity text-lg font-semibold`}>{formValues.session==="Theory" ? formValues.subject : formValues.labSubject}</h2>
      <div className='flex items-center gap-3'>
        <p>{props.presentStudents?.length}/{props.students?.length}</p>
        <button className='rounded-lg bg-[var(--primary)] px-2 py-1 text-white' onClick={handleSubmit}>Done</button>
      </div>
    </nav>
  )
}

export default Navbar
