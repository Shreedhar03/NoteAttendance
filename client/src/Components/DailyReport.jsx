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

        let data = await getDocs(collection(db, 'noteattendance'))
        
        // what i want ==>  record = [{record:[],year:"SE"},{record:[],year:"TE"},{record:[],year:"BE"}]

        let tempArr = []
        data.forEach(doc => {
            let temp = { record: [doc.data()], year: doc.id }
            tempArr.push(temp)
            console.log("doc.data()", doc.id, doc.data())
        })
        console.log("tempArr", tempArr)
        setRecord(tempArr)
        console.log("tempArr", tempArr)
        setRecordDate(tempArr[0]?.['record']?.[0]?.["A"]?.["Dated"] || tempArr[1]?.['record']?.[0]?.["A"]?.["Dated"] || tempArr[2]?.['record']?.[0]?.["A"]?.["Dated"])
    }

    useEffect(() => {
        getData()
        console.log("record", record)
    }, [])
    return (
        <section className='flex flex-col gap-2 px-4'>
            <Link to={'/selection'} className='text-3xl text-gray-800 self-start my-4'>&larr;</Link>
            <div>
                <h2 className='text-3xl'>Attendance Overview</h2>
                <p className='text-gray-700 font-semibold text-lg'>First Lecture</p>
            </div>
            <p className="font-semibold border-2 border-black rounded-lg self-start p-1">
                {recordDate || date.toUTCString()}
            </p>

            <div className='mt-4'>
                {
                    record?.map((rep, key) => {
                        return (
                            <Year
                                key={key}
                                // year={rep.record[0]['A']?.year || rep.record[0]['B']?.year || rep.record[0]['C']?.year || rep.record[0]['D']?.year} 
                                year={rep.year}
                                divisions={Object.values(rep.record[0])}
                                rep={rep.record[0]} />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default DailyReport

/*

        // data.forEach(doc => {
            //     // rawData.push({record:doc.data(),year:doc.id})
            //     // console.log(doc.id)
            //     // let newData = doc.data()
            //     let temp = {record:doc.data(),year:doc.id}
        //     temp.push(temp)
        //     // newData.year = doc.id
        //     // arr.push(newData)
        //     // let arr = Array.from(doc.data())
        //     console.log("doc.data()", doc.id, doc.data())
        // })
*/