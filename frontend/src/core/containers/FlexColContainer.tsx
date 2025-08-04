import React from 'react'

interface FlexColContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export const FlexColContainer = ({children, ...props}: FlexColContainerProps) => {
  return (
    <div className='flex flex-col justify-center items-center' {...props}>
        {children}
    </div>
  )
}
