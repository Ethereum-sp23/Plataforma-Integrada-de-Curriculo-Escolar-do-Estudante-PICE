import React from 'react'

interface ButtonProps {
  children: React.ReactNode
}

const Button = ({children}: ButtonProps) => {
  return (
    <button className='text-white border text-md inline-block py-4 px-8 rounded hover:scale-105 transition'>{children}</button>
  )
}

export default Button