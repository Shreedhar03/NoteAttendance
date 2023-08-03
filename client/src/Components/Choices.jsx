import React, { useEffect, useState } from 'react'
import Radio from './Radio'
import { useNavigate } from 'react-router-dom'
import { subjects } from '../../subjects.js'

const Choices = () => {
    const goto = useNavigate()
    const [formValues, setFormValues] = useState({
        year: "SE",
        division: "A",
        session: "Theory",
        subject: "DM",
        labSubject:"FDSL",
        batch: "S1"
    })
    const [theorySubjects, setTheorySubjects] = useState([])
    const [batches, setBatches] = useState([])
    const [labSubjects, setLabSubjects] = useState([])
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        // console.log("formValues.year",formValues.year)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        goto('/attendance')
        console.log(formValues)
        // console.log("okk")
        // console.log(subjects)
    }
    useEffect(() => {
        setTheorySubjects(subjects[formValues.year].theory)
        setLabSubjects(subjects[formValues.year].lab)
        setBatches(subjects[formValues.year].batches)
    }, [formValues])
    return (
        <form className='flex flex-col mt-8 gap-8 text-xl px-6' onSubmit={handleSubmit}>
            <div>
                <h1 className='text-2xl mb-2'>Year</h1>
                <div className="flex gap-3">
                    <Radio label="SE" value={formValues.year} handleChange={handleChange} name="year" sm={true} />
                    <Radio label="TE" value={formValues.year} handleChange={handleChange} name="year" sm={true} />
                    <Radio label="BE" value={formValues.year} handleChange={handleChange} name="year" sm={true} />
                </div>
            </div>
            <div>
                <h1 className='text-2xl mb-2'>Division</h1>
                <div className="flex gap-3">
                    <Radio handleChange={handleChange} value={formValues.division} label="A" name="division" sm={true} />
                    <Radio handleChange={handleChange} value={formValues.division} label="B" name="division" sm={true} />
                    <Radio handleChange={handleChange} value={formValues.division} label="C" name="division" sm={true} />
                    <Radio handleChange={handleChange} value={formValues.division} label="D" name="division" sm={true} />
                </div>
            </div>

            <div className="flex">
                <Radio handleChange={handleChange} value={formValues.session} label="Theory" name="session" sm={false} border_l={true} />
                <Radio handleChange={handleChange} value={formValues.session} label="Practical" name="session" sm={false} border_r={true} />
            </div>

            <div>
                {
                    formValues.session === "Practical" &&
                    <select name="labSubject" id="labSubject" onChange={handleChange} value={formValues.labSubject} required className='p-3 rounded-lg focus:outline-none bg-inherit border border-[var(--primary)]'>
                        {
                            labSubjects.map((lab, key) => {
                                return <option value={lab} key={key} className='py-2'>{lab}</option>
                            })
                        }
                    </select>
                }
                {
                    formValues.session === "Theory" ?
                        <select name="subject" id="subject" onChange={handleChange} value={formValues.subject} required className='p-3 rounded-lg focus:outline-none bg-inherit border border-[var(--primary)]'>
                            {theorySubjects.map((subject, key) => {
                                return <option key={key} value={subject} className='py-2'>{subject}</option>
                            })}
                        </select>
                        :
                        <select name="batch" id="batch" onChange={handleChange} value={formValues.batch} required className='ml-4 p-3 rounded-lg focus:outline-none bg-inherit border border-[var(--primary)]'>
                            {batches.map((subject, key) => {
                                return <option key={key} value={subject} className='py-2'>{subject}</option>
                            })}
                        </select>
                }
            </div>
            <input type="submit" value="Proceed" className='bg-[var(--primary)] p-3 mt-8 rounded-lg text-white' />

        </form>
    )
}

export default Choices
