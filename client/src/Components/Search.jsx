import React, { useContext, useState } from 'react'
import { AppContext } from '../App'
import StudentList from './StudentList'
const Search = () => {
  const { students } = useContext(AppContext)
  const [year, setYear] = useState("SE")
  const [division, setDivision] = useState("A")
  const [search, setSearch] = useState("")
  const [studentList, setStudentList] = useState(students)
  const handleSearch = (e) => {
    let tempStud = []
    setSearch(e.target.value)
    students.forEach(stu => {
      if (stu.fullName.includes(search)) {
        tempStud.push(stu)
      }
    })
    setStudentList(tempStud)
    // console.log(studentList)
  }
  const handleBlur = () => {
    setTimeout(()=>{
      setStudentList(students)
    },1000)
  }
  return (
    <section className='flex flex-col gap-3 my-8 px-6'>
      <div className='flex gap-4 justify-center'>
        <select name="year" id="year" value={year} onChange={(e) => setYear(e.target.value)} className='w-1/2 p-2 rounded-lg focus:outline-none bg-inherit border-2 border-gray-400'>
          <option value="SE">SE</option>
          <option value="TE">TE</option>
          <option value="BE">BE</option>
        </select>
        <select name="division" id="division" value={division} onChange={(e) => setDivision(e.target.value)} className='w-1/2 p-2 rounded-lg focus:outline-none bg-inherit border-2 border-gray-400'>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      <form>
        <input type="text" onBlur={handleBlur} placeholder='Search by Roll No. or Name' value={search} className='w-full px-3 py-2 border-2 border-gray-400 rounded-lg' onChange={handleSearch} />
        <div className='flex flex-col gap-2 mt-8'>
          {
            studentList.map((s, key) => {
              return (<StudentList key={key} id={key} name={s.fullName} roll={s.rollNo} check={false} />)
            })
          }
        </div>
      </form>

      <div>

      </div>
    </section>
  )
}

export default Search
