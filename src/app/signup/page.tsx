'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Vendor from "./../../../public/images/vendor.png"

type FormState = {
  name: string
  email: string
  city: string
  zip: string
  role: 'VENDOR' | 'SUPPORTER'
}

type FieldErrors = Partial<Record<keyof FormState, string>>

type FieldName = keyof FormState

function validateField(name: FieldName, value: string): string | undefined {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required.'
      break

    case 'email':
      if (!value.trim()) return 'Email is required.'
      if (!/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email address.'
      break

    case 'city':
      if (!value.trim()) return 'City is required.'
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


  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-stretch">
      <div className="w-full lg:w-1/2 bg-white flex items-start px-10 py-10 h-full pb-32">
        <div className="w-full max-w-md">
          <Image
            src="/images/logo.png"
            alt="Beiz Logo"
            width={120}
            height={89}
            className="mb-8"
          />
          <h1 className='text-[33px] font-bold text-[#232323] pt-8 px-10'>Pre-register Your Spot</h1>
          <p className='font-light text-[16px] mt-1 text-[#1C1C1C] px-10'>Welcome! Please enter your details.</p>
          <form onSubmit={handleSubmit} noValidate className="space-y-6 mt-10 px-10">
            {status === 'error' && errorMsg && (
              <p className="text-red-600 text-sm">{errorMsg}</p>
            )}
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-light text-[#36454F] mb-2 px-5">
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
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-light text-gray-600 mb-2 px-5">
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
            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-light text-[#36454F] mb-2 px-5">
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
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            {/* Zip */}
            <div>
              <label htmlFor="zip" className="block text-sm font-light text-[#36454F] mb-2 px-5">
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
              <p className="text-[17px] font-medium text-[#36454F] mb-2 ">Choose Your Role</p>
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

      <div className="w-full lg:w-1/2 relative  overflow-hidden">
        <Image
          src={Vendor}
          alt="Vendor"
          className="absolute top-0 left-0 object-cover w-full h-full" />

      </div>
    </div>
  )
}

