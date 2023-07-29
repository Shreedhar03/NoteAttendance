import { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Choices from './Components/Choices'
import Attendance from './Components/Attendance'
import Feedback from './Components/Feedback'
import Search from './Components/Search'

export const AppContext = createContext()
function App() {
  const [students,setStudents]=useState([
    { "rollNo": "01", "fullName": "Michael Isabella Williams" },
    { "rollNo": "02", "fullName": "Daniel Grace Garcia" },
    { "rollNo": "03", "fullName": "Emma Christopher Johnson" },
    { "rollNo": "04", "fullName": "Olivia Grace Davis" },
    { "rollNo": "05", "fullName": "Shreedhar Deodatta Urawane" },
    { "rollNo": "06", "fullName": "Michael Ava Martinez" },
    { "rollNo": "07", "fullName": "Olivia Joseph Wilson" },
    { "rollNo": "08", "fullName": "Yash Sudhakar Jawale" },
    { "rollNo": "09", "fullName": "John William Brown" },
    { "rollNo": "10", "fullName": "Emily Thomas Johnson" },
    { "rollNo": "11", "fullName": "Daniel Grace Davis" },
    { "rollNo": "12", "fullName": "Krutika Mahesh Ahire" },
    { "rollNo": "13", "fullName": "Michael Sophia Martinez" },
    { "rollNo": "14", "fullName": "Gaurav Vijay Gorane" },
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
  ])

  return (
    <AppContext.Provider value={{students}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/selection' element={<Choices />}></Route>
          <Route path='/attendance' element={<Attendance />}></Route>
          <Route path='/feedback' element={<Feedback />}></Route>
          <Route path='/search' element={<Search />}></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
