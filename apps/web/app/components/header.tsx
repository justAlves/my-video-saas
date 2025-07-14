import { VideoIcon } from 'lucide-react'
import React, { useEffect } from 'react'

export default function Header() {
  return (
    <header
      className='px-8 py-4 border-b w-full flex justify-between items-center'
    >
      <div className='flex items-center gap-2'>

        <VideoIcon
          className='size-6 text-purple-700'
        />
        <h1 className='text-xl font-bold font-mono'>
          Vixy
        </h1>
      </div>
      
    </header>
  )
}
