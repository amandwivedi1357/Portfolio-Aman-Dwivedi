import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const TestimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  quote: z.string().min(1, "Quote is required"),
  company: z.string().optional(),
  imageUrl: z.string().optional()
})

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany()
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Testimonials GET Error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch testimonials', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  // Disable session check for now during debugging
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }

  try {
    // Log the entire request headers and method for debugging
    console.log('Request Method:', request.method)
    console.log('Request Headers:', Object.fromEntries(request.headers))

    // Attempt to get the request body in multiple ways
    let body;
    try {
      // First, try to parse as JSON directly
      body = await request.json()
    } catch (jsonError) {
      console.error('JSON Parsing Error (direct):', jsonError)
      
      // If direct JSON parsing fails, try text parsing
      const rawBody = await request.text()
      console.log('Raw Request Body:', rawBody)
      
      try {
        // Attempt to parse raw body as JSON
        body = JSON.parse(rawBody)
      } catch (parseError) {
        console.error('JSON Parsing Error (text):', parseError)
        return NextResponse.json({ 
          error: 'Invalid JSON', 
          details: 'Unable to parse request body' 
        }, { status: 400 })
      }
    }

    // Validate the body
    const validatedData = TestimonialSchema.parse(body)

    // Create the testimonial
    const testimonial = await prisma.testimonial.create({
      data: validatedData
    })

    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    // Log the full error for debugging
    console.error('Testimonials POST Error:', error)

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: error.errors 
      }, { status: 400 })
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json({ 
        error: 'Invalid JSON', 
        details: error.message 
      }, { status: 400 })
    }

    // Generic error handling
    return NextResponse.json({ 
      error: 'Failed to create testimonial', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  // Disable session check for now during debugging
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }

  try {
    const body = await request.json()
    const { id, ...updateData } = body
    const validatedData = TestimonialSchema.parse(updateData)

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: validatedData
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('Testimonials PUT Error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ 
      error: 'Failed to update testimonial', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  // Disable session check for now during debugging
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 })
    }

    const testimonial = await prisma.testimonial.delete({
      where: { id }
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('Testimonials DELETE Error:', error)
    return NextResponse.json({ 
      error: 'Failed to delete testimonial', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
