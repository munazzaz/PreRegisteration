"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'
import Logo from "../../../public/images/logo.png"

const PreRegHeader = () => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`
        w-full 
        ${isSticky ? 'py-2' : 'mt-8 py-0'}      /* adjust header vertical spacing */
        sm:px-8 px-4 
        [@media(max-width:340px)]:px-2 
        sm:pr-8 [@media(max-width:340px)]:pr-2 pr-4
        flex justify-between items-center 
        sticky top-0 bg-white z-50 
        transition-all duration-300
      `}
    >
      <Link href="/">
    
          <Image
            src={Logo}
            alt="Beiz Logo"
            className={`
              md:w-[120px] w-[100px]
              [@media(max-width:500px)]:w-[90px]
              sm:h-[89px] h-[79px]
              [@media(max-width:500px)]:h-[69px]
              
              ${isSticky ? 'mt-3' : 'mt-0'}   /* <-- extra top margin when sticky */
              transition-[margin] duration-300
            `}
          />
   
      </Link>
      <nav>
        <Link
          href="/signup"
          className="[@media(max-width:300px)]:text-[14px] flex items-center justify-center sm:px-9 px-6 [@media(max-width:375px)]:px-3 [@media(max-width:375px)]:py-3 py-2 bg-[#0841D4] text-white font-semibold rounded-full hover:bg-[#2054D8] transition-colors"
        >
          <span>Sign Up</span>
          <ArrowLongRightIcon className="h-5 w-5 ml-2" />
        </Link>
      </nav>
    </header>
  )
}

export default PreRegHeader
