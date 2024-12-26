import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { uploadToFirebaseAdmin, deleteFromFirebaseAdmin } from '@/lib/firebase-admin'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
const prisma = new PrismaClient()
const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  githubLink: z.string().url("Invalid GitHub link").optional(),
  liveLink: z.string().url("Invalid live link").optional(),
  imageUrl: z.string().optional()
})
export async function GET() {
  try {
    const projects = await prisma.project.findMany()
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json(
      { details: 'Failed to fetch projects', error: String(error) }, 
      { status: 500 }
    )
  }
}
export async function POST(request: NextRequest) {
  // Disable session check for now during debugging
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }
  try {
    const formData = await request.formData()
    
    // Extract text fields
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const technologiesStr = formData.get('technologies') as string
    const githubLink = formData.get('githubLink') as string | null
    const liveLink = formData.get('liveLink') as string | null
    
    // Process technologies
    const technologies = technologiesStr.split(',').map(tech => tech.trim()).filter(tech => tech !== '')
    
    // Handle file upload
    let imageUrl: string | undefined
    const imageFile = formData.get('imageFile') as File | null
    
    if (imageFile && imageFile.size > 0) {
      // Upload to Firebase Admin
      imageUrl = await uploadToFirebaseAdmin(imageFile, 'projects')
    }
    // Validate the data
    const validatedData = ProjectSchema.parse({
      title,
      description,
      technologies,
      githubLink,
      liveLink,
      imageUrl
    })
    // Create project in database
    const project = await prisma.project.create({
      data: validatedData
    })
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Project Creation Error:', error)
    
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: error.errors 
      }, { status: 400 })
    }
    return NextResponse.json(
      { details: 'Failed to create project', error: String(error) }, 
      { status: 500 }
    )
  }
}
export async function PUT(request: NextRequest) {
  // Disable session check for now during debugging
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }
  try {
    const formData = await request.formData()
    
    // Extract text fields
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const technologiesStr = formData.get('technologies') as string
    const githubLink = formData.get('githubLink') as string | null
    const liveLink = formData.get('liveLink') as string | null
    
    // Process technologies
    const technologies = technologiesStr.split(',').map(tech => tech.trim()).filter(tech => tech !== '')
    
    // Get project ID from query params
    const url = new URL(request.url)
    const projectId = url.pathname.split('/').pop()
    if (!projectId) {
      return NextResponse.json(
        { details: 'Project ID is required' }, 
        { status: 400 }
      )
    }
    // Find existing project to handle old image
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    })
    // Handle file upload
    let imageUrl: string | undefined
    const imageFile = formData.get('imageFile') as File | null
    
    // Upload new image if provided
    if (imageFile && imageFile.size > 0) {
      // Delete old image if exists
      if (existingProject?.imageUrl) {
        try {
          await deleteFromFirebaseAdmin(existingProject.imageUrl)
        } catch (deleteError) {
          console.warn('Failed to delete old image:', deleteError)
        }
      }
      // Upload new image
      imageUrl = await uploadToFirebaseAdmin(imageFile, 'projects')
    }
    // Validate the data
    const validatedData = ProjectSchema.parse({
      title,
      description,
      technologies,
      githubLink,
      liveLink,
      imageUrl
    })
    // Update project in database
    const project = await prisma.project.update({
      where: { id: projectId },
      data: validatedData
    })
    return NextResponse.json(project)
  } catch (error) {
    console.error('Project Update Error:', error)
    
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: error.errors 
      }, { status: 400 })
    }
    return NextResponse.json(
      { details: 'Failed to update project', error: String(error) }, 
      { status: 500 }
    )
  }
}
export async function DELETE(request: NextRequest) {
  try {
    // Log the full request URL for debugging
    console.log('DELETE Request URL:', request.url)
    const url = new URL(request.url)
    const pathParts = url.pathname.split('/').filter(Boolean)
    
    // Log path parts for debugging
    console.log('Path Parts:', pathParts)
    // Extract project ID (last part of the path)
    const projectId = pathParts[pathParts.length - 1]
    if (!projectId) {
      console.error('No project ID provided in the request')
      return NextResponse.json(
        { details: 'Project ID is required', path: url.pathname }, 
        { status: 400 }
      )
    }
    console.log('Attempting to delete project with ID:', projectId)
    // Find existing project to delete associated image
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    })
    if (!existingProject) {
      console.error(`Project with ID ${projectId} not found`)
      return NextResponse.json(
        { details: 'Project not found', projectId }, 
        { status: 404 }
      )
    }
    // Delete image from Firebase if exists
    if (existingProject.imageUrl) {
      try {
        console.log('Attempting to delete image:', existingProject.imageUrl)
        await deleteFromFirebaseAdmin(existingProject.imageUrl)
        console.log('Image deleted successfully')
      } catch (deleteError) {
        console.error('Failed to delete project image:', deleteError)
        // Continue with project deletion even if image deletion fails
      }
    }
    // Delete project from database
    const deletedProject = await prisma.project.delete({
      where: { id: projectId }
    })
    console.log('Project deleted successfully:', deletedProject)
    return NextResponse.json({ 
      message: 'Project deleted successfully', 
      projectId: deletedProject.id 
    })
  } catch (error) {
    console.error('Project Deletion Error:', error)
    
    // More detailed error response
    return NextResponse.json(
      { 
        details: 'Failed to delete project', 
        error: String(error),
        errorStack: error instanceof Error ? error.stack : 'No stack trace available'
      }, 
      { status: 500 }
    )
  }
}