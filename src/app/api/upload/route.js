import { NextResponse } from 'next/server'

/**
 * Image upload handler for Netlify
 * Since Netlify serverless functions can't write to filesystem,
 * we convert images to base64 and store them as data URLs
 * 
 * For production, consider using Cloudinary or ImgBB for better performance
 */

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!file.type || !allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' }, { status: 400 })
    }

    // Validate file size (max 2MB for data URLs - smaller limit for database storage)
    const maxSize = 2 * 1024 * 1024 // 2MB (reduced for database storage)
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 2MB for direct upload. For larger images, use Cloudinary.' }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-')
    const filename = `${timestamp}-${originalName}`

    // Create data URL (can be used directly in <img src>)
    const dataUrl = `data:${file.type};base64,${base64Image}`

    // Return data URL - this will be stored in the database
    // The image can be displayed directly using this URL
    return NextResponse.json({
      success: true,
      filename: filename,
      path: dataUrl, // Full data URL
      url: dataUrl,  // Same as path for compatibility
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ 
      error: 'Failed to upload file: ' + (error.message || 'Unknown error') 
    }, { status: 500 })
  }
}
