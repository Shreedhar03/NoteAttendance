import React from 'react'
import '../index.css'

const Radio = (props) => {
  return (
    <>
      <input type="radio" className="hidden" name={props.name} id={props.label}/>
      <label
        htmlFor={props.label}
        className={`radio-btn ${props.sm ? 'h-10 w-10' : 'px-6 py-2'} flex items-center justify-center ${props.sm && 'rounded-lg'} border border-[var(--primary)]`}>
        {props.label}
      </label>
    </>

  )
}

export default Radio
