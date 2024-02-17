import React from 'react'

type Props = {}

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=' w-5/6 flex items-center h-screen justify-center'>{children}</div>
  )
}