import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
  const navigate=useNavigate()
  return (
    <nav className={`sticky top-0 bg-white z-10 px-6 ${props.navShodow && 'drop-shadow-xl'} transition-all flex items-center justify-between gap-3 py-4`}>
      <h2 className={`${props.navShodow?'opacity-100' : 'opacity-0'} transition-opacity text-lg font-semibold`}>DBMSL</h2>
      <div className='flex items-center gap-3'>
        <p>{props.presentStudents.length}/{props.students.length}</p>
        <button className='rounded-lg bg-[var(--primary)] px-2 py-1 text-white' onClick={()=>navigate('/feedback')}>Done</button>
      </div>
    </nav>
  )
}

export default Navbar
