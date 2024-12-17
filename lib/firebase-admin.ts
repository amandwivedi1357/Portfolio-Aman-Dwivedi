import admin from 'firebase-admin'

// Prevent reinitializing the app
if (!admin.apps.length) {
  try {
    // Log environment variables for debugging
    console.log('Firebase Project ID:', process.env.FIREBASE_PROJECT_ID)
    console.log('Firebase Client Email:', process.env.FIREBASE_CLIENT_EMAIL)
    console.log('Firebase Storage Bucket:', process.env.FIREBASE_STORAGE_BUCKET)
    
    // Ensure private key is not undefined
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
    if (!privateKey) {
      throw new Error('Firebase Private Key is not set in environment variables')
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey.replace(/\\n/g, '\n')
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    })

    console.log('Firebase Admin initialized successfully')
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error)
    throw error
  }
}

// Get a reference to the storage service
const bucket = admin.storage().bucket()

/**
 * Upload a file to Firebase Storage using Firebase Admin SDK
 * @param file File to upload
 * @param folder Folder path in Firebase Storage
 * @returns Download URL of the uploaded file
 */
export async function uploadToFirebaseAdmin(file: File, folder: string): Promise<string> {
  // Validate file type and size
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}`)
  }

  if (file.size > maxSize) {
    throw new Error(`File too large. Maximum size is 10MB, got ${file.size} bytes`)
  }

  try {
    // Convert File to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sanitize filename
    const sanitizedFilename = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '_')
      .replace(/_{2,}/g, '_')

    // Create a unique filename
    const filename = `${folder}/${Date.now()}_${sanitizedFilename}`

    // Create a file reference
    const fileRef = bucket.file(filename)

    // Upload the file
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type
      }
    })

    // Make the file publicly accessible
    await fileRef.makePublic()

    // Return the public URL
    return fileRef.publicUrl()
  } catch (error) {
    console.error('Firebase Admin Upload Error:', error)
    throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Delete a file from Firebase Storage
 * @param fileUrl URL of the file to delete
 */
export async function deleteFromFirebaseAdmin(fileUrl?: string): Promise<void> {
  if (!fileUrl) return

  try {
    // Extract the file path from the URL
    const parsedUrl = new URL(fileUrl)
    const filepath = decodeURIComponent(parsedUrl.pathname.split('/').slice(2).join('/'))

    // Delete the file
    await bucket.file(filepath).delete()
  } catch (error) {
    console.error('Firebase Admin Delete Error:', error)
    // Ignore not found errors
    if (error instanceof Error && error.message.includes('No such object')) {
      return
    }
    throw error
  }
}

export default admin
