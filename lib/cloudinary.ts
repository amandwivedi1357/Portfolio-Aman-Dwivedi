import { v2 as cloudinary } from 'cloudinary'
import { unlink } from 'fs/promises'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

/**
 * Upload a file to Cloudinary and return the secure URL
 * @param localFilePath Path to the local file to upload
 * @param folder Cloudinary folder to upload to
 * @returns Secure URL of the uploaded image
 */
export async function uploadToCloudinary(localFilePath: string, folder: string): Promise<string> {
  try {
    // Upload the file to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      folder: `portfolio/${folder}`,
      overwrite: true,
      unique_filename: true
    })

    // Delete the local file after successful upload
    try {
      await unlink(localFilePath)
    } catch (deleteError) {
      console.warn('Failed to delete local file:', deleteError)
    }

    // Return the secure URL of the uploaded image
    return uploadResponse.secure_url
  } catch (error) {
    console.error('Cloudinary Upload Error:', error)
    throw new Error('Failed to upload image to Cloudinary')
  }
}

/**
 * Delete an image from Cloudinary
 * @param imageUrl URL of the image to delete
 */
export async function deleteFromCloudinary(imageUrl?: string): Promise<void> {
  if (!imageUrl) return

  try {
    // Extract public ID from the image URL
    const publicId = imageUrl.split('/').pop()?.split('.')[0]
    
    if (!publicId) {
      console.warn('Could not extract public ID from image URL')
      return
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(`portfolio/${publicId}`)
  } catch (error) {
    console.error('Cloudinary Delete Error:', error)
  }
}
