import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const SkillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required")
})

export async function GET() {
  try {
    const skills = await prisma.skill.findMany()
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Skills GET Error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch skills', 
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
    const validatedData = SkillSchema.parse(body)

    // Create the skill
    const skill = await prisma.skill.create({
      data: validatedData
    })

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    // Log the full error for debugging
    console.error('Skills POST Error:', error)

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
      error: 'Failed to create skill', 
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
    const validatedData = SkillSchema.parse(updateData)

    const skill = await prisma.skill.update({
      where: { id },
      data: validatedData
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Skills PUT Error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ 
      error: 'Failed to update skill', 
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
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 })
    }

    const skill = await prisma.skill.delete({
      where: { id }
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Skills DELETE Error:', error)
    return NextResponse.json({ 
      error: 'Failed to delete skill', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
