import { NextResponse, type NextRequest } from 'next/server'
import { z, ZodError } from 'zod'
import { db } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

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
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json(
      { errors: { _errors: ['Malformed JSON request.'] } },
      { status: 400 }
    )
  }

  let data: z.infer<typeof SignupSchema>
  try {
    data = SignupSchema.parse(json)
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const fieldErrors = err.flatten().fieldErrors
      return NextResponse.json({ errors: fieldErrors }, { status: 400 })
    }
    return NextResponse.json(
      { errors: { _errors: ['Invalid request.'] } },
      { status: 400 }
    )
  }

  try {
    const record = await db.preRegistration.create({ data })
    return NextResponse.json({ id: record.id }, { status: 201 })
  } catch (err: unknown) {
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

    console.error('Unexpected signup error:', err)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

