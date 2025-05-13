'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Vendor from "./../../../public/images/vendor.png"
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import ResponsiveVendor from "./../../../public/images/rounded-girl.png"

type FormState = {
  name: string
  email: string
  city: string
  zip: string
  role: 'VENDOR' | 'SUPPORTER'
  businessName: string
  contact: string
  state: string
}

type FieldErrors = Partial<Record<keyof FormState, string>>

type FieldName = keyof FormState

function validateField(name: FieldName, value: string): string | undefined {
  const v = value.trim()
  switch (name) {
    case 'name':
      if (!v) return 'Name is required.'
      if (v.length < 3) return 'Name must be at least 3 characters.'
      if (v.length > 70) return 'Name must be at most 70 characters.'
      break

    case 'email':
      if (!value.trim()) return 'Email is required.'
      if (!/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email address.'
      break

    case 'city':
      if (!v) return 'City is required.'
      if (v.length < 3) return 'City must be at least 3 characters.'
      if (v.length > 70) return 'City must be at most 70 characters.'
      break

    case 'zip':
      if (value) {
        if (!/^\d+$/.test(value)) return 'ZIP must only contain numbers.'
        if (value.length !== 5) return 'ZIP must be 5 digits.'
      }
      break

    case 'role':
      if (!value) return 'Please select a role.'
      break

    case 'businessName':
      const name = value.trim();
      if (!name) {
        return 'Business Name is required.';
      }
      if (name.length < 3) {
        return 'Business Name must be at least 3 characters.';
      }
      if (name.length > 100) {
        return 'Business Name must be at most 100 characters.';
      }
      break


    case 'contact': {
      if (!value.trim()) {
        return 'Contact Information is required.'
      }
    
      // Remove everything except digits
      const digits = value.replace(/\D/g, '')
    
      // Must be exactly 10 digits
      if (digits.length !== 10) {
        return 'Contact must be a valid 10-digit U.S. phone number.'
      }
    
      // (Optional) Enforce a “visual” pattern
      // e.g. 1234567890, 123-456-7890, (123)456-7890, (123) 456 7890, etc.
      const visRegex = /^(?:\(\d{3}\)\s?|\d{3}[-\s]?)\d{3}[-\s]?\d{4}$/
      if (!visRegex.test(value)) {
        return 'Contact must be in a valid U.S. format (e.g. 123-456-7890).'
      }
    
      break
    }

    case 'state':
      if (!v) return 'State is required.'
      if (v.length < 3) return 'State must be at least 3 characters.'
      if (v.length > 70) return 'State must be at most 70 characters.'
      break
  }
  return undefined
}

function validateForm(form: FormState): FieldErrors {
  const errs: FieldErrors = {}
  for (const key in form) {
    const field = key as FieldName
    const error = validateField(field, form[field])
    if (error) errs[field] = error
  }
  return errs
}

export default function SignupPage() {
  const router = useRouter()

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    city: '',
    zip: '',
    role: 'VENDOR',
    businessName: '',
    contact: '',
    state: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target as { name: FieldName; value: string }

    setForm((prev) => ({ ...prev, [name]: value }))
    const fieldError = validateField(name as FieldName, value)
    setErrors((prev) => ({ ...prev, [name]: fieldError }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const clientErrors = validateForm(form)
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      setStatus('error')
      return
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push('/thankyou')
    } else {
      const json = await res.json().catch(() => ({}))
      setErrorMsg(json.error || 'Something went wrong')
      setStatus('error')
    }
  }
  const handleScroll = () => {
    const el = document.getElementById('next-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div  className='block lg:hidden'>
    <div className=" min-h-screen flex flex-col lg:flex-row items-stretch">

      <div  id="next-section" className="w-full lg:w-1/2 flex justify-center lg:justify-start px-10 sm:py-5  py-7 [@media(max-width:400px)]:py-1 [@media(max-width:400px)]:pb-14 h-full sm:pb-32  order-1 lg:order-2">
        <div className="w-full md:max-w-md">
          <h1 className='sm:text-[33px] text-[28px] [@media(max-width:451px)]:text-[20px] text-center font-bold text-[#232323] pt-8 xl:px-10 [@media(max-width:500px)]:px-0 px-5'>Pre-Register Your Spot</h1>
          <p className='font-light [@media(max-width:443px)]:text-[15px] text-[16px] text-center lg:mt-1 text-[#1C1C1C] xl:px-10 [@media(max-width:500px)]:px-0 px-8'>Welcome! Please enter your details.</p>
          <form onSubmit={handleSubmit} noValidate className="space-y-6 mt-10 items-center xl:px-10 [@media(max-width:500px)]:px-0 px-8">
            {status === 'error' && errorMsg && (
              <p className="text-red-600 text-sm">{errorMsg}</p>
            )}
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-[14px] [@media(max-width:446px)]:text-[13px]  text-sm font-light text-[#36454F] mb-2 px-5">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-full bg-white ring-1 ring-gray-200 px-6 py-3 placeholder-[#000000] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                value={form.name}
                onChange={handleChange}
                maxLength={70}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-light text-[14px] [@media(max-width:446px)]:text-[13px]  text-gray-600 mb-2 px-5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                className="w-full rounded-full bg-white ring-1 ring-gray-200 px-6 py-3 placeholder-[#000000] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm text-[14px]  [@media(max-width:446px)]:text-[13px] font-light text-[#36454F] mb-2 px-5">
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Enter your business name"
                className="w-full rounded-full bg-white ring-1 ring-gray-200 px-6 py-3 placeholder-[#000000] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                value={form.businessName}
                onChange={handleChange}
                maxLength={100}
              />
              {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
            </div>
            {/* Contact Information */}
            <div>
              <label htmlFor="contact" className="block text-sm text-[14px] [@media(max-width:446px)]:text-[13px]   font-light text-[#36454F] mb-2 px-5">
                Contact Information / Cell Phone Number
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                placeholder="e.g. 1234567890"
                className="w-full rounded-full bg-white ring-1 ring-gray-200 px-6 py-3 placeholder-[#000000] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                value={form.contact}
                onChange={handleChange}
              />
              {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
            </div>
            {/* State */}
            <div>
              <label htmlFor="state" className="block text-[14px] [@media(max-width:446px)]:text-[13px] text-sm font-light text-[#36454F] mb-2 px-5">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                placeholder="Enter your state"
                className="w-full rounded-full bg-white ring-1 ring-gray-200 px-6 py-3 placeholder-[#000000] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                value={form.state}
                onChange={handleChange}
                maxLength={70}
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
            {/* City */}
            <div>
              <label htmlFor="city" className="block text-[14px] [@media(max-width:446px)]:text-[13px]  text-sm font-light text-[#36454F] mb-2 px-5">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="City"
                className="w-full rounded-full bg-white ring-1 ring-gray-200 px-6 py-3 placeholder-[#000000] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                value={form.city}
                onChange={handleChange}
                maxLength={70}

              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            {/* Zip */}
            <div>
              <label htmlFor="zip" className="block text-[14px] [@media(max-width:446px)]:text-[13px]  text-sm font-light text-[#36454F] mb-2 px-5">
                Zip Code
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                placeholder="e.g. 12345"
                maxLength={5}
                className="w-full rounded-full bg-white ring-1 ring-gray-200 px-6 py-3 placeholder-[#000000] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                value={form.zip}
                onChange={handleChange}
              />
              {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
            </div>
            {/* Role */}
            <div>
              <p className="text-[17px] [@media(max-width:390px)]:text-[15px]  font-medium text-[#36454F] mb-2 ">Choose Your Role</p>
              <div className="flex space-x-6 mt-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="VENDOR"
                    checked={form.role === 'VENDOR'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-yellow-400"
                  />
                  <span className="ml-2 text-[#36454F]">Vendor</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="SUPPORTER"
                    checked={form.role === 'SUPPORTER'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-yellow-400"
                  />
                  <span className="ml-2 text-gray-700">Supporter</span>
                </label>
              </div>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-4 w-full rounded-full bg-[#D4AF37] text-white py-3 font-semibold hover:bg-[#E5C96B] transition disabled:opacity-50 "
            >
              {status === 'submitting' ? 'Submitting…' : 'Pre-Register'}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:block w-full relative overflow-hidden min-h-screen">
        <Image
          src={Vendor}
          alt="Vendor"
          fill
          className="absolute inset-0 object-cover" />

 
        <button
          onClick={handleScroll}
          aria-label="Scroll down"
          className="
            absolute bottom-10 left-1/2 
            transform -translate-x-1/2
            bg-white bg-opacity-60 hover:bg-opacity-80
            p-2 rounded-full
            animate-bounce">
          <ChevronDownIcon className="h-8 w-8 text-gray-800" />
        </button>
      </div>


      {/* Small Scrrens top section girl image */}

         <div className="block md:hidden w-full relative overflow-hidden sm:h-[600px]  [@media(max-width:480px)]:h-[350px]  h-[450px]">
        <Image
          src={ResponsiveVendor}
          alt="Vendor"
          fill
          className="absolute inset-0 object-cover" />
      </div>

    </div>
    </div>
  )
}
