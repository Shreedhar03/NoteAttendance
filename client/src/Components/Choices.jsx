import React from 'react'
import Radio from './Radio'

const Choices = () => {
    return (
        <form className='flex flex-col justify-center bg-slate-100 gap-6'>
            <div>
                <h1 className='text-xl mb-2'>Year</h1>
                <div className="flex gap-3">
                    <Radio label="SE" name="year" sm={true}/>
                    <Radio label="TE" name="year" sm={true}/>
                    <Radio label="BE" name="year" sm={true}/>
                </div>
            </div>
            <div>
                <h1 className='text-xl mb-2'>Division</h1>
                <div className="flex gap-3">
                    <Radio label="A" name="division" sm={true}/>
                    <Radio label="B" name="division" sm={true}/>
                    <Radio label="C" name="division" sm={true}/>
                    <Radio label="D" name="division" sm={true}/>
                </div>
            </div>
            <div>
                <h1 className='text-xl mb-2'>Division</h1>
                <div className="flex">
                    <Radio label="Theory" name="th-pract" sm={false}/>
                    <Radio label="Practical" name="th-pract" sm={false}/>
                </div>
            </div>
         
        </form>
    )
}

export default Choices
