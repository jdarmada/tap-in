import React from 'react'
import Image from 'next/image'
import tapInLogo from '../../public/tapinlogo.png'

const Navbar = () => {
  return (
    <div className='fixed translate-x-[28px] translate-y-[20px]'>
      <Image src={tapInLogo} alt="TapIn Logo" width={100} height={100} />
    </div>
  )
}

export default Navbar