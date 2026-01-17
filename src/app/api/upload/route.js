import { NextResponse } from 'next/server'

/**
 * Image upload handler for Netlify
 * Uses ImgBB free image hosting API to avoid serverless function timeouts
 * 
 * Alternative: Use Cloudinary (better, but requires API key setup)
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

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `File too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum size is 5MB. Please compress your image.` 
      }, { status: 400 })
    }

    // Convert file to base64 for ImgBB API
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')

    // Use ImgBB free API (no API key required for basic usage, but has rate limits)
    // Get free API key from: https://api.imgbb.com/
    // For now, we'll use a public endpoint or fallback to data URL for small images
    
    // Option 1: Try ImgBB if API key is set (optional)
    const imgbbApiKey = process.env.IMGBB_API_KEY
    
    if (imgbbApiKey && file.size < 3 * 1024 * 1024) { // Only use ImgBB for images under 3MB
      try {
        const imgbbFormData = new FormData()
        imgbbFormData.append('key', imgbbApiKey)
        imgbbFormData.append('image', base64Image)

        const imgbbResponse = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: imgbbFormData,
        })

        if (imgbbResponse.ok) {
          const imgbbData = await imgbbResponse.json()
          if (imgbbData.success && imgbbData.data) {
            const timestamp = Date.now()
            const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-')
            const filename = `${timestamp}-${originalName}`

            return NextResponse.json({
              success: true,
              filename: filename,
              path: imgbbData.data.url, // ImgBB URL
              url: imgbbData.data.url,
            })
          }
        }
      } catch (imgbbError) {
        console.error('ImgBB upload failed, falling back to data URL:', imgbbError)
        // Fall through to data URL method
      }
    }

    // Option 2: Fallback - Use data URL for smaller images only (to avoid timeout)
    // Only use data URLs for images under 1MB to prevent 502 errors
    if (file.size > 1 * 1024 * 1024) {
      return NextResponse.json({ 
        error: 'Image too large for direct upload. Please compress to under 1MB, or set up ImgBB API key in Netlify environment variables (IMGBB_API_KEY) for larger images.' 
      }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-')
    const filename = `${timestamp}-${originalName}`

    // Create data URL (only for small images)
    const dataUrl = `data:${file.type};base64,${base64Image}`

    return NextResponse.json({
      success: true,
      filename: filename,
      path: dataUrl,
      url: dataUrl,
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    const errorMessage = error?.message || error?.toString() || 'Unknown error occurred'
    return NextResponse.json({ 
      error: `Failed to upload file: ${errorMessage}`,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}
