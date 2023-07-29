import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Components/Login'
import Choices from './Components/Choices'
import Attendance from './Components/Attendance'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/selection' element={<Choices />}></Route>
        <Route path='/attendance' element={<Attendance />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
