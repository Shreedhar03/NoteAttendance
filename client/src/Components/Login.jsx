import React, { useContext, useState } from 'react'
import logo from '../assets/logo.svg'
import eye_close from '../assets/eye_close.svg'
import eye_open from '../assets/eye_open.svg'
import { AppContext } from '../App'
import credentials from '../credentials'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {loggedIn,setLoggedIn}=useContext(AppContext)
    const goto = useNavigate()
    const [showPass,setShowPass]=useState(false)
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(credentials.credentials)
        console.log(loggedIn)
        setLoggedIn(true)
        goto('/selection')
    }
    return (
        <div className='h-[80vh] flex flex-col items-center justify-center gap-12'>
            <div className="logo flex items-center">
                <img src={logo} alt="logo" />
                <div className='text-3xl flex flex-col font-semibold text-[var(--primary)]'><span>Note</span><span>Attendance</span></div>
            </div>
            <p className='text-xl'>Login to Continue</p>
            
            <form className='flex flex-col gap-3 w-[90%]' onSubmit={handleSubmit}>
                <input type="text" required value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' className='text-lg py-[6px] px-2 rounded-lg focus:outline-none bg-inherit border-2 border-[var(--primary)] ' />
                <div className="relative">
                    <input type={showPass ? 'text' : 'password'} required value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='w-full text-lg py-[6px] px-2 rounded-lg focus:outline-none bg-inherit border-2 border-[var(--primary)] ' />
                    <button type='button' onClick={()=>setShowPass(!showPass)}><img src={showPass ? eye_open : eye_close} alt="btn" className="absolute top-[10px] right-3 w-7" /></button>
                </div>
                <input type="submit" value="Proceed" className='bg-[var(--primary)] p-4 mt-8 rounded-lg text-white' />
            </form>
        </div>
    )
}

export default Login
