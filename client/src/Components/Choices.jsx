import React, { useEffect, useState } from 'react'
import Radio from './Radio'

const Choices = () => {
    const [formValues, setFormValues] = useState({
        year: "SE",
        division: "A",
        session: "Theory",
        subject: "DBMS",
        batch: "T1"
    })
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }
    return (
        <form className='flex flex-col mt-8 gap-8 text-xl px-6'>
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
                <select name="subject" id="subject" onChange={handleChange} value={formValues.subject} required className='p-3 rounded-lg focus:outline-none bg-inherit border border-[var(--primary)]'>
                    <option value="DBMS" className='py-2'>DBMS</option>
                    <option value="TOC" className='py-2'>TOC</option>
                    <option value="CNS" className='py-2'>CNS</option>
                    <option value="SPOS" className='py-2'>SPOS</option>
                    <option value="HCI" className='py-2'>HCI</option>
                </select>
                {formValues.session === "Practical" &&
                    <select name="batch" id="batch" onChange={handleChange} value={formValues.batch} required className='ml-4 p-3 rounded-lg focus:outline-none bg-inherit border border-[var(--primary)]'>
                        <option value="T1" className='py-2' selected>T1</option>
                        <option value="T2" className='py-2'>T2</option>
                        <option value="T3" className='py-2'>T3</option>
                    </select>
                }
            </div>

            <input type="submit" value="Proceed" className='bg-[var(--primary)] p-3 mt-8 rounded-lg text-white' />

        </form>
    )
}

export default Choices
