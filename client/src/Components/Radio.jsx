import React from 'react'
import '../index.css'

const Radio = (props) => {
  return (
    <>
      <input type="radio" className="hidden" name={props.name} id={props.label}/>
      <label
        htmlFor={props.label}
        className={`radio-btn ${props.sm ? 'h-14 w-14' : 'px-8 py-3'} flex items-center justify-center
        ${props.sm && 'rounded-lg'} border border-[var(--primary)]
        ${props.border_l && 'rounded-l-lg'} ${props.border_r && 'rounded-r-lg'}
        `}>
        {props.label}
      </label>
    </>

  )
}

export default Radio
