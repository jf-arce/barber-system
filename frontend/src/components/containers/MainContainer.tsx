import React from "react";

interface MainContainerProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}

export const MainContainer = ({children, ...props}: MainContainerProps) => {
  return (
    <main className="container mx-auto px-4" {...props}>
      {children}
    </main>
  )
}
