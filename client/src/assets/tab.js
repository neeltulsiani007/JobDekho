import React from 'react'

export default function tab({
    stepNo,
    title,
    message,
    state,
}) 
{
    return (
    <div className="relative flex items-start mb-10 space-x-5 ">
        <div>
            <div className={
                state == 'active' ? 'absolute inline-flex w-12 h-12 rounded-full opacity-30 animate-ping bg-primary-lightBlue lg:w-9 lg:h-9' : ''}>
            </div>
            <div className={
                state == 'active' ? 
                'flex items-center  justify-center mb-2 border-none rounded-full  h-12 w-12 lg:w-9 lg:h-9 text-primary-marineBlue bg-primary-lightBlue font-bold z-40' 
                : 
                'flex items-center justify-center mb-2 text-white border-[1.5px] border-white rounded-full h-12 w-12 lg:w-9 lg:h-9 bg-trasparent font-bold'
            }>
                {stepNo}
            </div>
        </div>
        
        <div className=" ">

        {title && 
            <div className="text-sm font-[Times New Roman] text-left text-neutral-lightGray font-semibold">{title}</div>
        }
        {message && 
            <div className="text-lg  font-[Times New Roman]  text-white font-bold">{message}</div>
        }
        </div>
    </div>
    )
}