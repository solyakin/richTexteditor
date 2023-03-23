import React from 'react'
import { DropdownProps } from './type'

const DropDownItem = ({icon, title, format, handleClick} : DropdownProps) => {
  return (
    <div className='w-full flex flex-row items-start gap-x-2' onClick={handleClick}>
        <div className="mb-3">
          {icon}
        </div>
        <div>
            <p className='font-medium text-sm'>{title}</p>
            <p className='text-xxs font-light text-slate-400'>{format}</p>
        </div>
    </div>
  )
}

export default DropDownItem