import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'


const PreRegHeader = () => {
  return (
    <header className="w-full mt-8 px-8 pr-8 flex justify-between items-center sticky top-0 bg-white z-50">
      <Image src={'/images/logo.png'} alt="Beiz Logo" width={120} height={89} />
      <nav>
        <Link
          href="/signup"
          className="flex items-center justify-center px-9 py-3 bg-[#0841D4] text-white font-semibold rounded-[100px] hover:bg-pink-600 transition-colors"
        >
          <span>Pre-register</span>
          <ArrowLongRightIcon className="h-5 w-5 ml-2" />
        </Link>
      </nav>

    </header>
  )
}

export default PreRegHeader
