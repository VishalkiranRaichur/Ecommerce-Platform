import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

// GET - Fetch all products from Neon database
export async function GET() {
  try {
    const products = await sql`
      SELECT 
        id,
        name,
        slug,
        price,
        category,
        description,
        images,
        tags,
        featured
      FROM products
      ORDER BY id ASC
    `
    
    // Convert PostgreSQL arrays to JavaScript arrays if needed
    const formattedProducts = products.map(product => ({
      ...product,
      images: Array.isArray(product.images) ? product.images : (product.images || []),
      tags: Array.isArray(product.tags) ? product.tags : (product.tags || []),
    }))

    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error('Error reading products:', error)
    
    // Check if it's a database connection error
    const errorMessage = error.message || 'Failed to load products'
    const isDbError = errorMessage.includes('DATABASE_URL') || errorMessage.includes('connection')
    
    return NextResponse.json({ 
      error: isDbError 
        ? 'Database connection error. Please check DATABASE_URL environment variable.'
        : 'Failed to load products: ' + errorMessage
    }, { status: 500 })
  }
}

// POST - Create new product in Neon database
export async function POST(request) {
  try {
    const body = await request.json()

    // Create slug from name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Insert new product into database
    const result = await sql`
      INSERT INTO products (name, slug, price, category, description, images, tags, featured)
      VALUES (${body.name}, ${slug}, ${parseFloat(body.price)}, ${body.category}, ${body.description}, ${JSON.stringify(body.images || [])}, ${JSON.stringify(body.tags || [])}, ${body.featured || false})
      RETURNING *
    `

    const newProduct = result[0]

    // Format the response
    const formattedProduct = {
      ...newProduct,
      images: Array.isArray(newProduct.images) ? newProduct.images : (newProduct.images || []),
      tags: Array.isArray(newProduct.tags) ? newProduct.tags : (newProduct.tags || []),
    }

    return NextResponse.json({ success: true, product: formattedProduct })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product: ' + error.message }, { status: 500 })
  }
}

// PUT - Update existing product in Neon database
export async function PUT(request) {
  try {
    const body = await request.json()

    // Build update query dynamically based on provided fields
    let updateSlug = null
    if (body.name) {
      updateSlug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }

    // Update product in database
    const result = await sql`
      UPDATE products
      SET 
        name = COALESCE(${body.name || null}, name),
        slug = COALESCE(${updateSlug || null}, slug),
        price = COALESCE(${body.price !== undefined ? parseFloat(body.price) : null}, price),
        category = COALESCE(${body.category || null}, category),
        description = COALESCE(${body.description || null}, description),
        images = COALESCE(${body.images !== undefined ? JSON.stringify(body.images) : null}, images),
        tags = COALESCE(${body.tags !== undefined ? JSON.stringify(body.tags) : null}, tags),
        featured = COALESCE(${body.featured !== undefined ? body.featured : null}, featured),
        updated_at = NOW()
      WHERE id = ${parseInt(body.id)}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const updatedProduct = result[0]

    // Format the response
    const formattedProduct = {
      ...updatedProduct,
      images: Array.isArray(updatedProduct.images) ? updatedProduct.images : (updatedProduct.images || []),
      tags: Array.isArray(updatedProduct.tags) ? updatedProduct.tags : (updatedProduct.tags || []),
    }

    return NextResponse.json({ success: true, product: formattedProduct })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product: ' + error.message }, { status: 500 })
  }
}
