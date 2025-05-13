import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SuccessImage from "./../../../public/images/success.png"

const page = () => {
  return (
    <div>   <div className="flex flex-col items-center mt-24 mb-10 sm:px-4 px-2">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center">
          <Image src={SuccessImage} alt="Success Image" className='sm:w-[300px] w-[250px]' />
        </div>
        <h1 className="mt-6 sm:text-[26px] text-[23px] [@media(max-width:470px)]:text-[18px] font-semibold text-[#1C1C1C] ">
          Congratulations! Your Form Has Been <br className="hidden sm:block"/> Successfully Submitted!
        </h1>
        <p className="mt-4 font-light md:px-0 px-4 md:pr-0 pr-4 sm:text-[16px] text-[15px] text-[#1C1C1C] mb-12">
          Thank you for registering. We’ve received your information and will be in touch shortly.
        </p>
        <Link href="/" className="sm:px-24 px-18 [@media(max-width:350px)]:px-10 py-4 w-full rounded-[100px] bg-[#D4AF37] text-white font-semibold [@media(max-width:280)]:text-[14px] text-[16px] transition disabled:opacity-50">
          Back To Home Page
        </Link>
      </div>
    </div></div>
  )
}

export default page