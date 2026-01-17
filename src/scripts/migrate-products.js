/**
 * Migration script to move products from products.json to Neon database
 * Run this once after setting up your Neon database
 * 
 * Usage: npm run migrate
 */

const { neon } = require('@neondatabase/serverless')
const fs = require('fs')
const path = require('path')

// Load environment variables (for local .env.local file)
require('dotenv').config({ path: path.join(__dirname, '../../.env.local') })

// Get database connection string
const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL)

async function migrateProducts() {
  try {
    // Read products from JSON file
    const productsPath = path.join(__dirname, '..', 'data', 'products.json')
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'))

    console.log(`\n🚀 Starting migration...`)
    console.log(`📦 Found ${productsData.length} products to migrate\n`)

    let successCount = 0
    let failCount = 0

    // Insert each product into database
    for (const product of productsData) {
      try {
        await sql`
          INSERT INTO products (id, name, slug, price, category, description, images, tags, featured)
          VALUES (
            ${product.id},
            ${product.name},
            ${product.slug},
            ${product.price},
            ${product.category},
            ${product.description},
            ${JSON.stringify(product.images || [])},
            ${JSON.stringify(product.tags || [])},
            ${product.featured || false}
          )
          ON CONFLICT (id) DO UPDATE
          SET
            name = EXCLUDED.name,
            slug = EXCLUDED.slug,
            price = EXCLUDED.price,
            category = EXCLUDED.category,
            description = EXCLUDED.description,
            images = EXCLUDED.images,
            tags = EXCLUDED.tags,
            featured = EXCLUDED.featured,
            updated_at = NOW()
        `
        console.log(`✅ [${product.id}] Migrated: ${product.name}`)
        successCount++
      } catch (error) {
        console.error(`❌ [${product.id}] Failed to migrate ${product.name}:`, error.message)
        failCount++
      }
    }

    console.log('\n' + '='.repeat(50))
    console.log(`✨ Migration complete!`)
    console.log(`✅ Successfully migrated: ${successCount} products`)
    if (failCount > 0) {
      console.log(`❌ Failed: ${failCount} products`)
    }
    console.log(`📊 Total: ${productsData.length} products`)
    console.log('='.repeat(50) + '\n')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateProducts()
