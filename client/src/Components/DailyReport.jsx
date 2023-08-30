import React, { useContext, useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import Year from './Year'
import { AppContext } from '../App'
import { Link } from 'react-router-dom'

const DailyReport = () => {
    const [record, setRecord] = useState([])
    const [recordDate, setRecordDate] = useState()
    const { db } = useContext(AppContext)
    const [date, setDate] = useState(new Date())
    const getData = async () => {
        const rawData = []
        let data = await getDocs(collection(db, 'noteattendance'))
        // console.log("data",data)
        data.forEach(doc => {
            // console.log("doc.data()",doc.data()) // SE TE BE data
            rawData.push(doc.data())
        })
        setRecord(rawData)
        // setRecordDate(record[0]?.["A"]?.["Dated"] || record[1]?.["A"]?.["Dated"] || record[2]?.["A"]?.["Dated"])
        setRecordDate(record[2]?.["A"]?.["Dated"])
        console.log("record", record)
        console.log("recordDate", recordDate)
        // console.log("rawData", rawData)
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <section className='flex flex-col gap-2 px-4'>
            <Link to={'/selection'} className='text-3xl text-gray-800 self-start my-4'>&larr;</Link>
            <div>
                <h2 className='text-3xl'>Attendance Overview</h2>
                <p className='text-gray-700'>First Lecture</p>
            </div>
            <p className="font-semibold border-2 border-black rounded-lg self-start p-1">
                {/* {date.toDateString()} */}
                {recordDate && recordDate}
            </p>

            <div className='mt-4'>
                {
                    record.map((rep, key) => {
                        return (
                            // <Year key={key} year={rep['A']?.year} divisions={[{count:'75/79',subject:'DBMS',division:'A'},{count:'75/89',subject:'DBMS',division:'B'},{count:'75/79',subject:'DBMS',division:'C'},{count:'75/79',subject:'DBMS',division:'D'}]}/>
                            <Year
                                key={key}
                                year={rep['A']?.year}
                                divisions={Object.values(rep)} />
                        )
                    })
                }
                {/* <Year year={"TE"} divisions={[{ count: '75/79', subject: 'DBMS', division: 'A' }, { count: '75/89', subject: 'DBMS', division: 'B' }, { count: '75/79', subject: 'DBMS', division: 'C' }, { count: '75/79', subject: 'DBMS', division: 'D' }]} /> */}
                {/* <Year year={"BE"} divisions={[{count:'75/79',subject:'DBMS',division:'A'},{count:'75/89',subject:'DBMS',division:'B'},{count:'75/79',subject:'DBMS',division:'C'},{count:'75/79',subject:'DBMS',division:'D'}]}/> */}
            </div>
        </section>
    )
}

export default DailyReport
