import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import axios from 'axios'
import moment from 'moment'
import { tz } from 'moment-timezone'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const now = moment()
tz.setDefault('Asia/Kolkata')
const today = now.format('DD MMM YYYY')

const Navbar = (props) => {
  const date = props.date.getDate().toString()
  const month = (props.date.getMonth() + 1).toString()
  const reqDate = month < 10 ? date + '/0' + month : date + '/' + month
  const { db, students, presentStudents, setPresentStudents, formValues, overwrite, setSubmitted } = useContext(AppContext)
  const navigate = useNavigate()

  // const firstLectureRef = collection(db, "noteattendance")
  // const docRef = doc(collection(db, 'noteattendance'), "TE")

  const docRef = doc(db, 'noteattendance', formValues.year)

  const markFirstLecture = async () => {

    const existingData = await getDoc(docRef)
    console.log(existingData.data())

    const rollNos = Object.keys(existingData.data()[formValues.div]).length !== 0 ? existingData.data()[formValues.div].presentCount : [0]
    const outOf = Object.keys(existingData.data()[formValues.div]).length !== 0 ? existingData.data()[formValues.div].outOf : [0]
    const record = {
      year: formValues.year,
      subject: formValues.subject,
      title: formValues.session == "Theory" ? formValues.subject : "Lab",
      division: formValues.div,
      session: formValues.session,
      presentCount: formValues.session == "Theory" ? [presentStudents.length] : [...rollNos, presentStudents.length],
      outOf: formValues.session == "Theory" ? [students.length] : [...outOf, students.length],
      Dated: today,
      flag: formValues.session == "Theory" ? true : false
    }
    try {
      if
        ((existingData?.data()[formValues.div]['Dated'] === today && formValues.session === "Theory") || existingData?.data()[formValues.div]?.flag === true) {
        console.log("1st lecture already taken")
      } else {
        await updateDoc(docRef, {
          [formValues.div]: record
          // 'D' : record 
        })
      }
      console.log("markedFL")
    } catch (err) {
      console.log(err)
    }
  }

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
      markFirstLecture()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <nav className={`sticky top-0 bg-white z-20 px-6 ${props.navShodow && 'drop-shadow-2xl'} transition-all flex items-center justify-between gap-3 py-4`}>
      <h2 className={`${props.navShodow ? 'opacity-100' : 'opacity-0'} transition-opacity text-lg font-semibold`}>{formValues.session === "Theory" ? formValues.subject : formValues.labSubject}</h2>
      <div className='flex items-center gap-3'>
        <p>{props.presentStudents?.length}/{props.students?.length}</p>
        <button className='rounded-lg bg-[var(--primary)] px-2 py-1 text-white' onClick={handleSubmit}>Done</button>
      </div>
    </nav>
  )
}

export default Navbar
