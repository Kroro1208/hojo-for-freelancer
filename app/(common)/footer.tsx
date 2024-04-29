import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className='hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2'>
      <div className='lg:max-w-screen-lg mx-auto flex items-center justify-center h-full'>
        <Button size="lg" variant="ghost" className='w-full'>
          <Image src="/leader.svg" alt="leader" height={32} width={40} className='mr-4 rounded-md'/>
          社長
        </Button>
        <Button size="lg" variant="ghost" className='w-full'>
          <Image src="/businessman.svg" alt="entrepreneur" height={32} width={40} className='mr-4 rounded-md'/>
          起業
        </Button>
        <Button size="lg" variant="ghost" className='w-full'>
          <Image src="/fight.svg" alt="freelance" height={32} width={40} className='mr-4 rounded-md'/>
          フリーランス
        </Button>
        <Button size="lg" variant="ghost" className='w-full'>
          <Image src="/family.svg" alt="family" height={32} width={40} className='mr-4 rounded-md'/>
          家族
        </Button>
      </div>
    </footer>
  )
}

export default Footer
