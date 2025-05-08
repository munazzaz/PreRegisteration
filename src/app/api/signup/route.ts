// // src/app/api/signup/route.ts
// import { NextResponse } from 'next/server'
// import { db } from '@/lib/prisma'    // <-- your `db` export

// export async function POST(req: Request) {
//   // 1) Parse request body
//   const { name, email, city, zip, role } = await req.json()

//   // 2) Basic validation
//   if (!name || !email || !role) {
//     return NextResponse.json(
//       { error: 'Name, email, and role are required.' },
//       { status: 400 }
//     )
//   }

//   // 3) Write to database
//   try {
//     const record = await db.preRegistration.create({
//       data: { name, email, city, zip, role },
//     })
//     return NextResponse.json({ id: record.id }, { status: 201 })
//   } catch (err: any) {
//     // handle e.g. duplicate email
//     return NextResponse.json(
//       { error: err.message || 'Internal error' },
//       { status: 500 }
//     )
//   }
// }



// // src/app/api/signup/route.ts (Correct code)
// import { NextResponse } from 'next/server'
// import { z } from 'zod'
// import { db } from '@/lib/prisma'

// // 1) Define a schema matching your FormState + validation rules
// const SignupSchema = z.object({
//   name: z.string().min(1, 'Name is required.'),
//   email: z.string().email('Invalid email address.'),
//   city: z.string().min(1, 'City is required.'),
//   zip: z
//     .string()
//     .optional()
//     .refine((val) => !val || /^\d{5}$/.test(val), 'ZIP must be 5 digits.'),
//   role: z.enum(['VENDOR', 'SUPPORTER'], {
//     errorMap: () => ({ message: 'Please select a role.' }),
//   }),
// })

// export async function POST(req: Request) {
//   // 2) Parse & validate in one step
//   let data: z.infer<typeof SignupSchema>
//   try {
//     data = SignupSchema.parse(await req.json())
//   } catch (err: any) {
//     // 3) If validation fails, return 400 with field errors
//     const fieldErrors = err.flatten?.().fieldErrors || { _errors: [err.message] }
//     return NextResponse.json({ errors: fieldErrors }, { status: 400 })
//   }

//   // If valid, `data` is typed: { name, email, city, zip?, role }
//   try {
//     const record = await db.preRegistration.create({ data })
//     return NextResponse.json({ id: record.id }, { status: 201 })
//   } catch (err: any) {
//     // handle duplicate-email (Prisma P2002) with a 409
//     if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
//       return NextResponse.json(
//         { error: 'This email is already registered.' },
//         { status: 409 }
//       )
//     }
//     return NextResponse.json(
//       { error: err.message || 'Internal server error.' },
//       { status: 500 }
//     )
//   }
// }



// src/app/api/signup/route.ts
import { NextResponse, type NextRequest } from 'next/server'
import { z, ZodError } from 'zod'
import { db } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// 1) Define your Zod schema for validation
const SignupSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  city: z.string().min(1, 'City is required.'),
  zip: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{5}$/.test(val), 'ZIP must be 5 digits.'),
  role: z.enum(['VENDOR', 'SUPPORTER'], {
    errorMap: () => ({ message: 'Please select a role.' }),
  }),
})

export async function POST(req: NextRequest) {
  // 2) Parse JSON body safely
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json(
      { errors: { _errors: ['Malformed JSON request.'] } },
      { status: 400 }
    )
  }

  // 3) Validate with Zod
  let data: z.infer<typeof SignupSchema>
  try {
    data = SignupSchema.parse(json)
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const fieldErrors = err.flatten().fieldErrors
      return NextResponse.json({ errors: fieldErrors }, { status: 400 })
    }
    // Fallback for unexpected errors
    return NextResponse.json(
      { errors: { _errors: ['Invalid request.'] } },
      { status: 400 }
    )
  }

  // 4) Write to your database
  try {
    const record = await db.preRegistration.create({ data })
    return NextResponse.json({ id: record.id }, { status: 201 })
  } catch (err: unknown) {
    // 5) Handle Prisma "unique constraint" error for duplicate email
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002' &&
      Array.isArray(err.meta?.target) &&
      err.meta.target.includes('email')
    ) {
      return NextResponse.json(
        { error: 'This email is already registered.' },
        { status: 409 }
      )
    }

    // 6) Log and return generic 500
    console.error('Unexpected signup error:', err)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}


// import { NextResponse } from 'next/server'
// import { z } from 'zod'
// import { db } from '@/lib/prisma'
// import { verifyRecaptcha } from '@/lib/recaptcha'

// // Extend your schema to expect the token
// const SignupSchema = z.object({
//   name: z.string().min(1, 'Name is required.'),
//   email: z.string().email('Invalid email address.'),
//   city: z.string().min(1, 'City is required.'),
//   zip: z
//     .string()
//     .optional()
//     .refine((val) => !val || /^\d{5}$/.test(val), 'ZIP must be 5 digits.'),
//   role: z.enum(['VENDOR', 'SUPPORTER'], {
//     errorMap: () => ({ message: 'Please select a role.' }),
//   }),
//   recaptchaToken: z.string(),
// })

// export async function POST(req: Request) {
//   // 1) parse & validate everything (including token)
//   let parsed: z.infer<typeof SignupSchema>
//   try {
//     parsed = SignupSchema.parse(await req.json())
//   } catch (err: any) {
//     const fieldErrors = err.flatten?.().fieldErrors || { _errors: [err.message] }
//     return NextResponse.json({ errors: fieldErrors }, { status: 400 })
//   }

//   // 2) verify reCAPTCHA
//   const validCaptcha = await verifyRecaptcha(parsed.recaptchaToken)
//   console.log('reCAPTCHA response for', parsed.email, 'was', validCaptcha)
//   if (!validCaptcha) {
//     return NextResponse.json(
//       { error: 'Failed bot check; please try again.' },
//       { status: 403 }
//     )
//   }

//   // 3) strip token, then save to DB
//   const { recaptchaToken, ...data } = parsed
//   try {
//     const record = await db.preRegistration.create({ data })
//     return NextResponse.json({ id: record.id }, { status: 201 })
//   } catch (err: any) {
//     if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
//       return NextResponse.json(
//         { error: 'This email is already registered.' },
//         { status: 409 }
//       )
//     }
//     return NextResponse.json(
//       { error: err.message || 'Internal server error.' },
//       { status: 500 }
//     )
//   }
// }
