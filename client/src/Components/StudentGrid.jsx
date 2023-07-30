import React from 'react'

const StudentGrid = (props) => {

    const handleCheck = () => {
        if (props.presentStudents.includes(props.name)) {
            props.setPresentStudents(props.presentStudents.filter(e => e !== props.name))
        } else {
            props.setPresentStudents([...props.presentStudents, props.name])
        }
    }

    return (
        <>
            {
                <label htmlFor={props.id} className={`${props.presentStudents.includes(props.name) ? 'bg-green-500' : 'bg-gray-100'} rounded-lg text-xl h-12 w-12 flex items-center justify-center`}>
                    {props.roll.slice(4)}
                </label>
            }
            <input type="checkbox" name="present" id={props.id} className='hidden' onChange={handleCheck} />
        </>
    )
}

export default StudentGrid
