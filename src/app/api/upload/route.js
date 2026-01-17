import { NextResponse } from 'next/server'

/**
 * Image upload handler for Netlify
 * Uses ImgBB free image hosting API to avoid serverless function timeouts
 * 
 * Requires: IMGBB_API_KEY environment variable in Netlify
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

    // Validate file size (max 5MB for ImgBB)
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

    // Get ImgBB API key from environment
    const imgbbApiKey = process.env.IMGBB_API_KEY
    
    // Option 1: Use ImgBB if API key is set (for all images up to 5MB)
    if (imgbbApiKey) {
      try {
        // ImgBB API expects form data with key and image (base64 string)
        const imgbbFormData = new FormData()
        imgbbFormData.append('key', imgbbApiKey)
        imgbbFormData.append('image', base64Image)

        const imgbbResponse = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: imgbbFormData,
        })

        const imgbbData = await imgbbResponse.json()

        if (imgbbResponse.ok && imgbbData.success && imgbbData.data && imgbbData.data.url) {
          const timestamp = Date.now()
          const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-')
          const filename = `${timestamp}-${originalName}`

          return NextResponse.json({
            success: true,
            filename: filename,
            path: imgbbData.data.url, // ImgBB URL
            url: imgbbData.data.url,
          })
        } else {
          // ImgBB returned an error
          const errorMsg = imgbbData?.error?.message || imgbbData?.error?.message || JSON.stringify(imgbbData)
          console.error('ImgBB API error:', imgbbData)
          return NextResponse.json({ 
            error: `ImgBB upload failed: ${errorMsg}. Please check your IMGBB_API_KEY.` 
          }, { status: 500 })
        }
      } catch (imgbbError) {
        console.error('ImgBB upload error:', imgbbError)
        return NextResponse.json({ 
          error: `ImgBB upload failed: ${imgbbError.message || imgbbError.toString()}. Please check your IMGBB_API_KEY in Netlify environment variables.` 
        }, { status: 500 })
      }
    }

    // Option 2: Fallback - Use data URL for small images only (if no ImgBB key)
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

    // Create data URL (only for small images, no ImgBB key)
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
