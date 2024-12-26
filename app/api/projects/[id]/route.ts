import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { uploadToFirebaseAdmin, deleteFromFirebaseAdmin } from '@/lib/firebase-admin'

const prisma = new PrismaClient()

// Define ProjectSchema
const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  githubLink: z.string().url("Invalid GitHub link").optional(),
  liveLink: z.string().url("Invalid live link").optional(),
  imageUrl: z.string().optional()
})

export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    // REMOVE ALL AUTHENTICATION CHECKS
    const projectId = params.id

    if (!projectId) {
      return NextResponse.json(
        { details: 'Project ID is required' }, 
        { status: 400 }
      )
    }

    // Find existing project to delete associated image
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!existingProject) {
      return NextResponse.json(
        { details: 'Project not found', projectId }, 
        { status: 404 }
      )
    }

    // Delete image from Firebase if exists
    if (existingProject.imageUrl) {
      try {
        await deleteFromFirebaseAdmin(existingProject.imageUrl)
      } catch (deleteError) {
        console.error('Failed to delete project image:', deleteError)
      }
    }

    // Delete project from database
    const deletedProject = await prisma.project.delete({
      where: { id: projectId }
    })

    return NextResponse.json({ 
      message: 'Project deleted successfully', 
      projectId: deletedProject.id 
    })
  } catch (error) {
    console.error('Project Deletion Error:', error)
    
    return NextResponse.json(
      { 
        details: 'Failed to delete project', 
        error: String(error)
      }, 
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
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
      
      const projectId = context.params.id
  
      // Find existing project to handle old image
      const existingProject = await prisma.project.findUnique({
        where: { id: projectId }
      })
  
      if (!existingProject) {
        return NextResponse.json(
          { details: 'Project not found' }, 
          { status: 404 }
        )
      }
  
      // Handle file upload
      let imageUrl: string | undefined = existingProject.imageUrl ?? undefined
      const imageFile = formData.get('imageFile')
      
      if (imageFile && imageFile instanceof File && imageFile.size > 0) {
        // Delete old image if exists
        if (existingProject.imageUrl) {
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