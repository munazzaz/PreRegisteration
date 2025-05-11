import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SuccessImage from "./../../../public/images/success.png"

const page = () => {
  return (
    <div>   <div className="flex flex-col items-center mt-16 mb-10 px-4">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center">
          <Image src={SuccessImage} alt="Success Image" className='w-[300px] ' />
        </div>
        <h1 className="mt-6 text-[26px] font-semibold text-[#1C1C1C] ">
          Congratulations! Your Form Has Been<br /> Successfully Submitted!
        </h1>
        <p className="mt-4 font-light text-[16px]  text-[#1C1C1C] mb-12">
          Thank you for registering. We’ve received your information and will be in touch shortly.
        </p>
        <Link href="/" className="px-24 py-4 w-full rounded-[100px] bg-[#D4AF37] text-white font-semibold text-[16px] transition disabled:opacity-50">
          Back To Home Page
        </Link>
      </div>
    </div></div>
  )
}

export default page