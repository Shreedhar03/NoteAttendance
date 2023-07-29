import React from 'react'
import Radio from './Radio'

const Choices = () => {
    return (
        <form className='flex flex-col mt-8 gap-8 text-xl px-6'>
            <div>
                <h1 className='text-2xl mb-2'>Year</h1>
                <div className="flex gap-3">
                    <Radio label="SE" name="year" sm={true} />
                    <Radio label="TE" name="year" sm={true} />
                    <Radio label="BE" name="year" sm={true} />
                </div>
            </div>
            <div>
                <h1 className='text-2xl mb-2'>Division</h1>
                <div className="flex gap-3">
                    <Radio label="A" name="division" sm={true} />
                    <Radio label="B" name="division" sm={true} />
                    <Radio label="C" name="division" sm={true} />
                    <Radio label="D" name="division" sm={true} />
                </div>
            </div>

            <div className="flex">
                <Radio label="Theory" name="th-pract" sm={false} border_l={true}/>
                <Radio label="Practical" name="th-pract" sm={false} border_r={true}/>
            </div>

            <div>
                <select name="Subject" id="subject" className='p-3 rounded-lg focus:outline-none bg-inherit border border-[var(--primary)]'>
                    <option value="DBMS" className='py-2'>DBMS</option>
                    <option value="TOC" className='py-2'>TOC</option>
                    <option value="CNS" className='py-2'>CNS</option>
                    <option value="SPOS" className='py-2'>SPOS</option>
                    <option value="HCI" className='py-2'>HCI</option>
                </select>
                <select name="Batch" id="subject" className='ml-4 p-3 rounded-lg focus:outline-none bg-inherit border border-[var(--primary)]'>
                    <option value="T1" className='py-2'>T1</option>
                    <option value="T2" className='py-2'>T2</option>
                    <option value="T3" className='py-2'>T3</option>
                </select>
            </div>

            <input type="submit" value="Proceed" className='bg-[var(--primary)] p-3 mt-8 rounded-lg text-white' />

        </form>
    )
}

export default Choices
