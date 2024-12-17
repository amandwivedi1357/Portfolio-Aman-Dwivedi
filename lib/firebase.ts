import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, FirebaseStorage } from 'firebase/storage'

// Validate Firebase configuration
function validateFirebaseConfig() {
  const requiredEnvVars = [
    'FIREBASE_API_KEY',
    'FIREBASE_AUTH_DOMAIN',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_STORAGE_BUCKET',
    'FIREBASE_MESSAGING_SENDER_ID',
    'FIREBASE_APP_ID'
  ]

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    throw new Error(`Missing Firebase configuration environment variables: ${missingVars.join(', ')}`)
  }
}

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

// Validate configuration on module import
validateFirebaseConfig()

// Initialize Firebase
let app: FirebaseApp
let storage: FirebaseStorage

try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  storage = getStorage(app)
} catch (error) {
  console.error('Firebase Initialization Error:', error)
  throw error
}

/**
 * Sanitize filename to be storage-friendly
 * @param filename Original filename
 * @returns Sanitized filename
 */
function sanitizeFilename(filename: string): string {
  // Remove special characters and spaces, replace with underscores
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '_')
    .replace(/_{2,}/g, '_')
}

/**
 * Upload a file to Firebase Storage
 * @param file File to upload
 * @param folder Folder path in Firebase Storage
 * @returns Download URL of the uploaded file
 */
export async function uploadToFirebase(file: File, folder: string): Promise<string> {
  if (!file) {
    throw new Error('No file provided for upload')
  }

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
    // Sanitize filename and generate unique name
    const sanitizedFilename = sanitizeFilename(file.name)
    const filename = `${folder}/${Date.now()}_${sanitizedFilename}`
    const storageRef = ref(storage, filename)

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file)
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    return downloadURL
  } catch (error) {
    console.error('Firebase Upload Error:', error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('unauthorized')) {
        throw new Error('Upload failed: Storage permissions not configured. Please check Firebase Storage rules.')
      }
      if (error.message.includes('quota')) {
        throw new Error('Upload failed: Storage quota exceeded.')
      }
    }
    
    throw new Error(`Failed to upload file to Firebase: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Delete a file from Firebase Storage
 * @param fileUrl URL of the file to delete
 */
export async function deleteFromFirebase(fileUrl?: string): Promise<void> {
  if (!fileUrl) return

  try {
    // Create a reference to the file
    const fileRef = ref(storage, fileUrl)
    
    // Delete the file
    await deleteObject(fileRef)
  } catch (error) {
    console.error('Firebase Delete Error:', error)
    // Ignore not found errors
    if (error instanceof Error && error.message.includes('object does not exist')) {
      return
    }
    throw error
  }
}

// Export Firebase instances for potential future use
export { app, storage }
