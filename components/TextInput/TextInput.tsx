import React, { useState } from 'react'

const TextInput = ({
    name, 
    placeholder, 
    value, 
    onChange, 
    onBlur,
    label,
    formik,
    type,
    disabled
}) => {

    const [visible, setvisible] = useState(false);

  return (
    <div className='text-input'>
        <div className="mb-4">
            <div className="d-flex">
                <label htmlFor={name} className='text-xs text-slate-600'>
                    {label}
                </label>
            </div>
            <div 
            >
                <input 
                className='w-full flex flex-row p-1.5 rounded mt-1 text-base bg-white bg-whit border border-[#d1d1d1"] outline-0'
                style={{cursor : disabled ? "not-allowed" : "text", opacity : disabled ? "0.6" : 1}}
                id={name}
                type={type} 
                placeholder={placeholder} 
                name={name} 
                value={value} 
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                />
            </div>

        {formik.touched[name] && formik.errors[name] ? (
            <div className='text-red-600 text-sm'>{formik.errors[name]}</div>
        ) : null}
        </div>
    </div>
  )
}

export default TextInput