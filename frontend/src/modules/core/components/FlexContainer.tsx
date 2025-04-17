import React from 'react'

interface FlexContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export const FlexContainer = ({children, ...props}: FlexContainerProps) => {
  return (
    <div className='flex justify-center items-center' {...props}>
        {children}
    </div>
  )
}
