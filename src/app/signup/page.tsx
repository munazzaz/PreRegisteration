'use client'

// import { useState, FormEvent } from 'react'

// export default function SignupPage() {
//   const [form, setForm] = useState({
//     name: '', email: '', city: '', zip: '', role: 'VENDOR',
//   })
//   const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle')
//   const [errorMsg, setErrorMsg] = useState('')

//   function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault()
//     setStatus('submitting')

//     const res = await fetch('/api/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     })

//     if (res.ok) {
//       setStatus('success')
//     } else {
//       const json = await res.json()
//       setErrorMsg(json.error || 'Something went wrong')
//       setStatus('error')
//     }
//   }

//   if (status === 'success') {
//     return <p className="text-green-600 text-center">Thanks for pre-registering!</p>
//   }

//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
//       {status === 'error' && <p className="text-red-600">{errorMsg}</p>}

//       <input
//         name="name" type="text" required
//         placeholder="Name"
//         className="w-full p-2 border rounded"
//         onChange={handleChange}
//       />

//       <input
//         name="email" type="email" required
//         placeholder="Email"
//         className="w-full p-2 border rounded"
//         onChange={handleChange}
//       />

//       <input
//         name="city" type="text"
//         placeholder="City"
//         className="w-full p-2 border rounded"
//         onChange={handleChange}
//       />

//       <input
//         name="zip" type="text"
//         placeholder="ZIP"
//         className="w-full p-2 border rounded"
//         onChange={handleChange}
//       />

//       <select
//         name="role"
//         className="w-full p-2 border rounded"
//         onChange={handleChange}
//         value={form.role}
//       >
//         <option value="VENDOR">Vendor</option>
//         <option value="SUPPORTER">Supporter</option>
//       </select>

//       <button
//         type="submit"
//         disabled={status === 'submitting'}
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//       >
//         {status === 'submitting' ? 'Submitting…' : 'Pre-Register'}
//       </button>
//     </form>
//   )
// }


// import { useState, FormEvent } from 'react'

// type FormState = {
//   name: string
//   email: string
//   city: string
//   zip: string
//   role: 'VENDOR' | 'SUPPORTER'
// }

// type FieldErrors = Partial<Record<keyof FormState, string>>

// export default function SignupPage() {
//   const [form, setForm] = useState<FormState>({
//     name: '',
//     email: '',
//     city: '',
//     zip: '',
//     role: 'VENDOR',
//   })
//   const [errors, setErrors] = useState<FieldErrors>({})
//   const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
//   const [errorMsg, setErrorMsg] = useState('')

//   function handleChange(
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//     setErrors((prev) => ({ ...prev, [name]: undefined })) // clear this field's error
//   }

//   function validate(): FieldErrors {
//     const errs: FieldErrors = {}
//     // Required
//     if (!form.name.trim()) errs.name = 'Name is required.'
//     // Email format
//     const emailRe = /^\S+@\S+\.\S+$/
//     if (!form.email.trim()) {
//       errs.email = 'Email is required.'
//     } else if (!emailRe.test(form.email)) {
//       errs.email = 'Invalid email address.'
//     }
//     // ZIP format (5 digits)
//     if (form.zip) {
//       const zipRe = /^\d{5}$/
//       if (!zipRe.test(form.zip)) {
//         errs.zip = 'ZIP must be 5 digits.'
//       }
//     }
//     // Role
//     if (!form.role) errs.role = 'Please select a role.'
//     return errs
//   }

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault()
//     setStatus('submitting')
//     setErrorMsg('')

//     // 1) client-side validation
//     const clientErrors = validate()
//     if (Object.keys(clientErrors).length > 0) {
//       setErrors(clientErrors)
//       setStatus('error')
//       return
//     }

//     // 2) submit
//     const res = await fetch('/api/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     })

//     if (res.ok) {
//       setStatus('success')
//     } else {
//       const json = await res.json().catch(() => ({}))
//       setErrorMsg(json.error || 'Something went wrong')
//       setStatus('error')
//     }
//   }

//   if (status === 'success') {
//     return (
//       <p className="text-green-600 text-center mt-8">
//         Thanks for pre-registering!
//       </p>
//     )
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto p-4 space-y-4"
//       noValidate
//     >
//       {/* Global error */}
//       {status === 'error' && errorMsg && (
//         <p className="text-red-600">{errorMsg}</p>
//       )}

//       {/* Name */}
//       <div>
//         <input
//           name="name"
//           type="text"
//           placeholder="Name"
//           className="w-full p-2 border rounded"
//           value={form.name}
//           onChange={handleChange}
//         />
//         {errors.name && (
//           <p className="text-red-600 text-sm mt-1">{errors.name}</p>
//         )}
//       </div>

//       {/* Email */}
//       <div>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//           value={form.email}
//           onChange={handleChange}
//         />
//         {errors.email && (
//           <p className="text-red-600 text-sm mt-1">{errors.email}</p>
//         )}
//       </div>

//       {/* City (optional) */}
//       <div>
//         <input
//           name="city"
//           type="text"
//           placeholder="City"
//           className="w-full p-2 border rounded"
//           value={form.city}
//           onChange={handleChange}
//         />
//       </div>

//       {/* ZIP */}
//       <div>
//         <input
//           name="zip"
//           type="text"
//           placeholder="ZIP (5 digits)"
//           className="w-full p-2 border rounded"
//           value={form.zip}
//           onChange={handleChange}
//           maxLength={5}
//         />
//         {errors.zip && (
//           <p className="text-red-600 text-sm mt-1">{errors.zip}</p>
//         )}
//       </div>

//       {/* Role */}
//       <div>
//         <select
//           name="role"
//           className="w-full p-2 border rounded"
//           value={form.role}
//           onChange={handleChange}
//         >
//           <option value="VENDOR">Vendor</option>
//           <option value="SUPPORTER">Supporter</option>
//         </select>
//         {errors.role && (
//           <p className="text-red-600 text-sm mt-1">{errors.role}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={status === 'submitting'}
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
//       >
//         {status === 'submitting' ? 'Submitting…' : 'Pre-Register'}
//       </button>
//     </form>
//   )
// }

// // correct code add validation like when something wrong enters at the moment it gave error
// 'use client'

// import { useState, FormEvent } from 'react'

// type FormState = {
//   name: string
//   email: string
//   city: string
//   zip: string
//   role: 'VENDOR' | 'SUPPORTER'
// }

// type FieldErrors = Partial<Record<keyof FormState, string>>

// export default function SignupPage() {
//   const [form, setForm] = useState<FormState>({
//     name: '',
//     email: '',
//     city: '',
//     zip: '',
//     role: 'VENDOR',
//   })
//   const [errors, setErrors] = useState<FieldErrors>({})
//   const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
//   const [errorMsg, setErrorMsg] = useState('')

//   function handleChange(
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//     setErrors((prev) => ({ ...prev, [name]: undefined }))
//   }

//   function validate(): FieldErrors {
//     const errs: FieldErrors = {}

//     // Name required
//     if (!form.name.trim()) {
//       errs.name = 'Name is required.'
//     }

//     // Email required & format
//     const emailRe = /^\S+@\S+\.\S+$/
//     if (!form.email.trim()) {
//       errs.email = 'Email is required.'
//     } else if (!emailRe.test(form.email)) {
//       errs.email = 'Invalid email address.'
//     }

//     // City required
//     if (!form.city.trim()) {
//       errs.city = 'City is required.'
//     }

//     // ZIP optional, but if present must be 5 digits
//     if (form.zip) {
//       const zipRe = /^\d{5}$/
//       if (!zipRe.test(form.zip)) {
//         errs.zip = 'ZIP must be 5 digits.'
//       }
//     }

//     // Role required (should always be set)
//     if (!form.role) {
//       errs.role = 'Please select a role.'
//     }

//     return errs
//   }

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault()
//     setStatus('submitting')
//     setErrorMsg('')

//     const clientErrors = validate()
//     if (Object.keys(clientErrors).length > 0) {
//       setErrors(clientErrors)
//       setStatus('error')
//       return
//     }

//     const res = await fetch('/api/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     })

//     if (res.ok) {
//       setStatus('success')
//     } else {
//       const json = await res.json().catch(() => ({}))
//       setErrorMsg(json.error || 'Something went wrong')
//       setStatus('error')
//     }
//   }

//   if (status === 'success') {
//     return (
//       <p className="text-green-600 text-center mt-8">
//         Thanks for pre-registering!
//       </p>
//     )
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto p-4 space-y-4"
//       noValidate
//     >
//       {status === 'error' && errorMsg && (
//         <p className="text-red-600">{errorMsg}</p>
//       )}

//       {/* Name */}
//       <div>
//         <input
//           name="name"
//           type="text"
//           placeholder="Name"
//           className="w-full p-2 border rounded"
//           value={form.name}
//           onChange={handleChange}
//         />
//         {errors.name && (
//           <p className="text-red-600 text-sm mt-1">{errors.name}</p>
//         )}
//       </div>

//       {/* Email */}
//       <div>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//           value={form.email}
//           onChange={handleChange}
//         />
//         {errors.email && (
//           <p className="text-red-600 text-sm mt-1">{errors.email}</p>
//         )}
//       </div>

//       {/* City (now required) */}
//       <div>
//         <input
//           name="city"
//           type="text"
//           placeholder="City"
//           className="w-full p-2 border rounded"
//           value={form.city}
//           onChange={handleChange}
//         />
//         {errors.city && (
//           <p className="text-red-600 text-sm mt-1">{errors.city}</p>
//         )}
//       </div>

//       {/* ZIP */}
//       <div>
//         <input
//           name="zip"
//           type="text"
//           placeholder="ZIP (5 digits, optional)"
//           className="w-full p-2 border rounded"
//           value={form.zip}
//           onChange={handleChange}
//           maxLength={5}
//         />
//         {errors.zip && (
//           <p className="text-red-600 text-sm mt-1">{errors.zip}</p>
//         )}
//       </div>

//       {/* Role */}
//       <div>
//         <select
//           name="role"
//           className="w-full p-2 border rounded"
//           value={form.role}
//           onChange={handleChange}
//         >
//           <option value="VENDOR">Vendor</option>
//           <option value="SUPPORTER">Supporter</option>
//         </select>
//         {errors.role && (
//           <p className="text-red-600 text-sm mt-1">{errors.role}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={status === 'submitting'}
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
//       >
//         {status === 'submitting' ? 'Submitting…' : 'Pre-Register'}
//       </button>
//     </form>
//   )
// }


// correct validation right time code with some errors
// 'use client'

// import { useState, FormEvent } from 'react'

// type FormState = {
//   name: string
//   email: string
//   city: string
//   zip: string
//   role: 'VENDOR' | 'SUPPORTER'
// }

// type FieldErrors = Partial<Record<keyof FormState, string>>

// // 1) Single‐field validation helper
// function validateField<K extends keyof FormState>(
//   name: K,
//   value: FormState[K]
// ): string | undefined {
//   switch (name) {
//     case 'name':
//       if (!String(value).trim()) return 'Name is required.'
//       break

//     case 'email':
//       if (!String(value).trim()) return 'Email is required.'
//       // simple email regex
//       if (!/^\S+@\S+\.\S+$/.test(String(value)))
//         return 'Invalid email address.'
//       break

//     case 'city':
//       if (!String(value).trim()) return 'City is required.'
//       break

//     case 'zip':
//       if (value) {
//         if (!/^\d{5}$/.test(String(value))) return 'ZIP must be 5 digits.'
//       }
//       break

//     case 'role':
//       if (!value) return 'Please select a role.'
//       break
//   }
//   return undefined
// }

// // 2) Full‐form validator for on-submit
// function validateForm(form: FormState): FieldErrors {
//   const errs: FieldErrors = {}
//   (Object.keys(form) as (keyof FormState)[]).forEach((key) => {
//     const error = validateField(key, form[key])
//     if (error) errs[key] = error
//   })
//   return errs
// }

// export default function SignupPage() {
//   const [form, setForm] = useState<FormState>({
//     name: '',
//     email: '',
//     city: '',
//     zip: '',
//     role: 'VENDOR',
//   })
//   const [errors, setErrors] = useState<FieldErrors>({})
//   const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
//   const [errorMsg, setErrorMsg] = useState('')

//   function handleChange(
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) {
//     const { name, value } = e.target as { name: keyof FormState; value: string }

//     // 3) Update form value
//     setForm((prev) => ({ ...prev, [name]: value }))

//     // 4) Immediately validate this field
//     const fieldError = validateField(name, value as any)
//     setErrors((prev) => ({ ...prev, [name]: fieldError }))
//   }

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault()
//     setStatus('submitting')
//     setErrorMsg('')

//     // 5) Final full‐form validation
//     const clientErrors = validateForm(form)
//     if (Object.keys(clientErrors).length > 0) {
//       setErrors(clientErrors)
//       setStatus('error')
//       return
//     }

//     const res = await fetch('/api/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     })

//     if (res.ok) {
//       setStatus('success')
//     } else {
//       const json = await res.json().catch(() => ({}))
//       setErrorMsg(json.error || 'Something went wrong')
//       setStatus('error')
//     }
//   }

//   if (status === 'success') {
//     return (
//       <p className="text-green-600 text-center mt-8">
//         Thanks for pre-registering!
//       </p>
//     )
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto p-4 space-y-4"
//       noValidate
//     >
//       {status === 'error' && errorMsg && (
//         <p className="text-red-600">{errorMsg}</p>
//       )}

//       {/* Name */}
//       <div>
//         <input
//           name="name"
//           type="text"
//           placeholder="Name"
//           className="w-full p-2 border rounded"
//           value={form.name}
//           onChange={handleChange}
//         />
//         {errors.name && (
//           <p className="text-red-600 text-sm mt-1">{errors.name}</p>
//         )}
//       </div>

//       {/* Email */}
//       <div>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//           value={form.email}
//           onChange={handleChange}
//         />
//         {errors.email && (
//           <p className="text-red-600 text-sm mt-1">{errors.email}</p>
//         )}
//       </div>

//       {/* City */}
//       <div>
//         <input
//           name="city"
//           type="text"
//           placeholder="City"
//           className="w-full p-2 border rounded"
//           value={form.city}
//           onChange={handleChange}
//         />
//         {errors.city && (
//           <p className="text-red-600 text-sm mt-1">{errors.city}</p>
//         )}
//       </div>

//       {/* ZIP */}
//       <div>
//         <input
//           name="zip"
//           type="text"
//           placeholder="ZIP (5 digits, optional)"
//           className="w-full p-2 border rounded"
//           value={form.zip}
//           onChange={handleChange}
//           maxLength={5}
//         />
//         {errors.zip && (
//           <p className="text-red-600 text-sm mt-1">{errors.zip}</p>
//         )}
//       </div>

//       {/* Role */}
//       <div>
//         <select
//           name="role"
//           className="w-full p-2 border rounded"
//           value={form.role}
//           onChange={handleChange}
//         >
//           <option value="VENDOR">Vendor</option>
//           <option value="SUPPORTER">Supporter</option>
//         </select>
//         {errors.role && (
//           <p className="text-red-600 text-sm mt-1">{errors.role}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={status === 'submitting'}
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
//       >
//         {status === 'submitting' ? 'Submitting…' : 'Pre-Register'}
//       </button>
//     </form>
//   )
// }


// 'use client'
// import { useState, FormEvent } from 'react'

// type FormState = {
//   name: string
//   email: string
//   city: string
//   zip: string
//   role: 'VENDOR' | 'SUPPORTER'
// }

// type FieldErrors = Partial<Record<keyof FormState, string>>

// // 1) Single‑field validation helper
// type FieldName = keyof FormState
// function validateField(name: FieldName, value: string): string | undefined {
//   switch (name) {
//     case 'name':
//       if (!value.trim()) return 'Name is required.'
//       break

//     case 'email':
//       if (!value.trim()) return 'Email is required.'
//       if (!/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email address.'
//       break

//     case 'city':
//       if (!value.trim()) return 'City is required.'
//       break

//     case 'zip':
//       if (value) {
//         if (!/^\d+$/.test(value)) return 'ZIP must only contain numbers.'
//         if (value.length !== 5) return 'ZIP must be 5 digits.'
//       }
//       break

//     case 'role':
//       if (!value) return 'Please select a role.'
//       break
//   }
//   return undefined
// }

// // 2) Full‑form validator for on‑submit
// const validateForm = (form: FormState): FieldErrors => {
//   const errs: FieldErrors = {}
//   (Object.keys(form) as FieldName[]).forEach((key) => {
//     const error = validateField(key, form[key])
//     if (error) errs[key] = error
//   })
//   return errs
// }

// export default function SignupPage() {
//   const [form, setForm] = useState<FormState>({
//     name: '',
//     email: '',
//     city: '',
//     zip: '',
//     role: 'VENDOR',
//   })
//   const [errors, setErrors] = useState<FieldErrors>({})
//   const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
//   const [errorMsg, setErrorMsg] = useState('')

//   function handleChange(
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) {
//     const { name, value } = e.target as { name: FieldName; value: string }

//     // Update form
//     setForm((prev) => ({ ...prev, [name]: value }))

//     // Immediate field validation
//     const fieldError = validateField(name, value)
//     setErrors((prev) => ({ ...prev, [name]: fieldError }))
//   }

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault()
//     setStatus('submitting')
//     setErrorMsg('')

//     const clientErrors = validateForm(form)
//     if (Object.keys(clientErrors).length > 0) {
//       setErrors(clientErrors)
//       setStatus('error')
//       return
//     }

//     const res = await fetch('/api/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     })

//     if (res.ok) {
//       setStatus('success')
//     } else {
//       const json = await res.json().catch(() => ({}))
//       setErrorMsg(json.error || 'Something went wrong')
//       setStatus('error')
//     }
//   }

//   if (status === 'success') {
//     return (
//       <p className="text-green-600 text-center mt-8">
//         Thanks for pre-registering!
//       </p>
//     )
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg mx-auto p-4 space-y-4"
//       noValidate
//     >
//       {status === 'error' && errorMsg && (
//         <p className="text-red-600">{errorMsg}</p>
//       )}

//       {/* Name */}
//       <div>
//         <input
//           name="name"
//           type="text"
//           placeholder="Name"
//           className="w-full p-2 border rounded"
//           value={form.name}
//           onChange={handleChange}
//         />
//         {errors.name && (
//           <p className="text-red-600 text-sm mt-1">{errors.name}</p>
//         )}
//       </div>

//       {/* Email */}
//       <div>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//           value={form.email}
//           onChange={handleChange}
//         />
//         {errors.email && (
//           <p className="text-red-600 text-sm mt-1">{errors.email}</p>
//         )}
//       </div>

//       {/* City */}
//       <div>
//         <input
//           name="city"
//           type="text"
//           placeholder="City"
//           className="w-full p-2 border rounded"
//           value={form.city}
//           onChange={handleChange}
//         />
//         {errors.city && (
//           <p className="text-red-600 text-sm mt-1">{errors.city}</p>
//         )}
//       </div>

//       {/* ZIP */}
//       <div>
//         <input
//           name="zip"
//           type="text"
//           placeholder="ZIP (5 digits, optional)"
//           className="w-full p-2 border rounded"
//           value={form.zip}
//           onChange={handleChange}
//           maxLength={5}
//         />
//         {errors.zip && (
//           <p className="text-red-600 text-sm mt-1">{errors.zip}</p>
//         )}
//       </div>

//       {/* Role */}
//       <div>
//         <select
//           name="role"
//           className="w-full p-2 border rounded"
//           value={form.role}
//           onChange={handleChange}
//         >
//           <option value="VENDOR">Vendor</option>
//           <option value="SUPPORTER">Supporter</option>
//         </select>
//         {errors.role && (
//           <p className="text-red-600 text-sm mt-1">{errors.role}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={status === 'submitting'}
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
//       >
//         {status === 'submitting' ? 'Submitting…' : 'Pre-Register'}
//       </button>
//     </form>
//   )
// }


// Correct validated complete form
'use client'

import { useState, FormEvent } from 'react'

type FormState = {
  name: string
  email: string
  city: string
  zip: string
  role: 'VENDOR' | 'SUPPORTER'
}

type FieldErrors = Partial<Record<keyof FormState, string>>

type FieldName = keyof FormState

// 1) Single‑field validation helper
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

// 2) Full‑form validator for on‑submit
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
      setStatus('success')
    } else {
      const json = await res.json().catch(() => ({}))
      setErrorMsg(json.error || 'Something went wrong')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-green-600 text-center mt-8">
        Thanks for pre-registering!
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 space-y-4"
      noValidate
    >
      {status === 'error' && errorMsg && (
        <p className="text-red-600">{errorMsg}</p>
      )}

      {/* Name */}
      <div>
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* City */}
      <div>
        <input
          name="city"
          type="text"
          placeholder="City"
          className="w-full p-2 border rounded"
          value={form.city}
          onChange={handleChange}
        />
        {errors.city && (
          <p className="text-red-600 text-sm mt-1">{errors.city}</p>
        )}
      </div>

      {/* ZIP */}
      <div>
        <input
          name="zip"
          type="text"
          placeholder="ZIP (5 digits, optional)"
          className="w-full p-2 border rounded"
          value={form.zip}
          onChange={handleChange}
          maxLength={5}
        />
        {errors.zip && (
          <p className="text-red-600 text-sm mt-1">{errors.zip}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <select
          name="role"
          className="w-full p-2 border rounded"
          value={form.role}
          onChange={handleChange}
        >
          <option value="VENDOR">Vendor</option>
          <option value="SUPPORTER">Supporter</option>
        </select>
        {errors.role && (
          <p className="text-red-600 text-sm mt-1">{errors.role}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting…' : 'Pre-Register'}
      </button>
    </form>
  )
}



// 'use client'

// import { useState, useRef, FormEvent } from 'react'
// import ReCAPTCHA from 'react-google-recaptcha'

// // — your FormState & validation helpers —

// type FormState = {
//   name: string
//   email: string
//   city: string
//   zip: string
//   role: 'VENDOR' | 'SUPPORTER'
// }

// type FieldErrors = Partial<Record<keyof FormState, string>>
// type FieldName = keyof FormState



// function validateField(name: FieldName, value: string): string | undefined {
//   switch (name) {
//     case 'name':
//       if (!value.trim()) return 'Name is required.'
//       break
//     case 'email':
//       if (!value.trim()) return 'Email is required.'
//       if (!/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email address.'
//       break
//     case 'city':
//       if (!value.trim()) return 'City is required.'
//       break
//     case 'zip':
//       if (value) {
//         if (!/^\d+$/.test(value)) return 'ZIP must only contain numbers.'
//         if (value.length !== 5) return 'ZIP must be 5 digits.'
//       }
//       break
//     case 'role':
//       if (!value) return 'Please select a role.'
//       break
//   }
//   return undefined
// }

// function validateForm(form: FormState): FieldErrors {
//   const errs: FieldErrors = {}
//   ;(Object.keys(form) as FieldName[]).forEach((key) => {
//     const error = validateField(key, form[key])
//     if (error) errs[key] = error
//   })
//   return errs
// }

// export default function SignupPage() {
//   // 1) form state
//   const [form, setForm] = useState<FormState>({
//     name: '',
//     email: '',
//     city: '',
//     zip: '',
//     role: 'VENDOR',
//   })

//   // 2) validation errors
//   const [errors, setErrors] = useState<FieldErrors>({})

//   // 3) submission status
//   const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
//   const [errorMsg, setErrorMsg] = useState('')

//   // 4) recaptcha ref
//   const recaptchaRef = useRef<ReCAPTCHA>(null)

//   function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
//     const { name, value } = e.target as { name: FieldName; value: string }
//     setForm((prev) => ({ ...prev, [name]: value }))
//     setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
//   }

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault()
//     setStatus('submitting')
//     setErrorMsg('')

//     // client‐side full validation
//     const clientErrors = validateForm(form)
//     if (Object.keys(clientErrors).length > 0) {
//       setErrors(clientErrors)
//       setStatus('error')
//       return
//     }

//     // get recaptcha token
//     const token = await recaptchaRef.current?.executeAsync()
//     if (!token) {
//       setErrorMsg('Bot check failed — please try again.')
//       setStatus('error')
//       return
//     }

//     // send form + token
//     const res = await fetch('/api/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ ...form, recaptchaToken: token }),
//     })

//     if (res.ok) {
//       setStatus('success')
//     } else {
//       const json = await res.json().catch(() => ({}))
//       setErrorMsg(json.error || 'Something went wrong')
//       setStatus('error')
//     }
//   }

//   if (status === 'success') {
//     return <p className="text-green-600 text-center mt-8">Thanks for pre-registering!</p>
//   }

  

//   return (
//     <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4" noValidate>
//       {status === 'error' && errorMsg && <p className="text-red-600">{errorMsg}</p>}

//       {/* Name */}
//       <div>
//         <input
//           name="name"
//           type="text"
//           placeholder="Name"
//           className="w-full p-2 border rounded"
//           value={form.name}
//           onChange={handleChange}
//         />
//         {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
//       </div>

//       {/* Email */}
//       <div>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//           value={form.email}
//           onChange={handleChange}
//         />
//         {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
//       </div>

//       {/* City */}
//       <div>
//         <input
//           name="city"
//           type="text"
//           placeholder="City"
//           className="w-full p-2 border rounded"
//           value={form.city}
//           onChange={handleChange}
//         />
//         {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
//       </div>

//       {/* ZIP */}
//       <div>
//         <input
//           name="zip"
//           type="text"
//           placeholder="ZIP (5 digits, optional)"
//           className="w-full p-2 border rounded"
//           value={form.zip}
//           onChange={handleChange}
//           maxLength={5}
//         />
//         {errors.zip && <p className="text-red-600 text-sm mt-1">{errors.zip}</p>}
//       </div>

//       {/* Role */}
//       <div>
//         <select name="role" className="w-full p-2 border rounded" value={form.role} onChange={handleChange}>
//           <option value="VENDOR">Vendor</option>
//           <option value="SUPPORTER">Supporter</option>
//         </select>
//         {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
//       </div>

//       {/* Invisible reCAPTCHA */}
//       <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} size="invisible" ref={recaptchaRef} />

//       <button
//         type="submit"
//         disabled={status === 'submitting'}
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
//       >
//         {status === 'submitting' ? 'Submitting…' : 'Pre-Register'}
//       </button>
//     </form>
//   )
// }
