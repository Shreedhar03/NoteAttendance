import React, { useState } from 'react'
import Year from './Year'

const DailyReport = () => {
    const [date,setDate]=useState(new Date())
    return (
        <section className='flex flex-col gap-2 px-4'>
            <button className='text-3xl text-gray-800 self-start my-4'>&larr;</button>
            <div>
                <h2 className='text-3xl'>Attendance Overview</h2>
                <p className='text-gray-700'>First Lecture</p>
            </div>
            <p className="font-semibold border-2 border-black rounded-lg self-start p-1">
            {date.toDateString()}
            </p>

            <div className='mt-4'>
                <Year year={"SE"} divisions={[{count:'75/79',subject:'DBMS',division:'A'},{count:'75/89',subject:'DBMS',division:'B'},{count:'75/79',subject:'DBMS',division:'C'},{count:'75/79',subject:'DBMS',division:'D'}]}/>
                <Year year={"TE"} divisions={[{count:'75/79',subject:'DBMS',division:'A'},{count:'75/89',subject:'DBMS',division:'B'},{count:'75/79',subject:'DBMS',division:'C'},{count:'75/79',subject:'DBMS',division:'D'}]}/>
                <Year year={"BE"} divisions={[{count:'75/79',subject:'DBMS',division:'A'},{count:'75/89',subject:'DBMS',division:'B'},{count:'75/79',subject:'DBMS',division:'C'},{count:'75/79',subject:'DBMS',division:'D'}]}/>
            </div>
        </section>
    )
}

export default DailyReport
