# Neon Database Setup Guide

This guide will help you complete the setup of Neon database for your Sujatha Boutique website.

## ✅ What You've Done

- ✅ Created Neon project
- ✅ Ran `npx neonctl init`
- ✅ Created `products` table in Neon

## 🔧 Next Steps

### Step 1: Get Your Database Connection String

1. Go to your **Neon Dashboard** (console.neon.tech)
2. Select your project
3. Go to **"Connection Details"** or **"Connection String"**
4. Copy the **connection string** (looks like: `postgresql://user:password@host.neon.tech/dbname?sslmode=require`)

### Step 2: Add Environment Variable to Netlify

1. Go to your **Netlify Dashboard** → Your Site → **Site Settings**
2. Click **"Environment Variables"**
3. Click **"Add a variable"**
4. Add:
   - **Key:** `DATABASE_URL`
   - **Value:** Your Neon connection string (paste it here)
5. Click **"Save"**

### Step 3: Install Dependencies Locally

In your project folder, run:
```bash
cd "/Users/vishalkiranshreenivasraichur/Desktop/Sujatha Boutique"
npm install
```

### Step 4: Set Local Environment Variable (for testing)

Create a `.env.local` file in your project root:
```bash
DATABASE_URL=your-neon-connection-string-here
```

⚠️ **Important:** Never commit `.env.local` to GitHub (it's already in `.gitignore`)

### Step 5: Verify Your Database Table Structure

Make sure your `products` table in Neon has these columns:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  images JSONB DEFAULT '[]',
  tags JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

If your table is different, update it or let me know and I'll adjust the code.

### Step 6: Migrate Existing Products to Database

You have two options:

#### Option A: Using Migration Script (Recommended)

1. Make sure `.env.local` is set with `DATABASE_URL`
2. Update `package.json` to add a migration script:
   ```json
   "scripts": {
     "migrate": "node src/scripts/migrate-products.js"
   }
   ```
3. Run the migration:
   ```bash
   npm run migrate
   ```

#### Option B: Manual Migration via Neon SQL Editor

1. Go to Neon Dashboard → SQL Editor
2. Run this SQL for each product (use your products.json as reference):

```sql
INSERT INTO products (id, name, slug, price, category, description, images, tags, featured)
VALUES 
  (1, 'Elegant Embroidered Silk Blouse', 'elegant-embroidered-silk-blouse', 2499, 'Blouses', 'A stunning silk blouse...', '["1768627302112-IMG-0227.jpeg"]'::jsonb, '["silk", "embroidered", "festive", "elegant"]'::jsonb, true),
  -- ... add all your products
```

### Step 7: Test Locally

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/admin`
3. Try editing a product - it should save to Neon database now!

### Step 8: Deploy to Netlify

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add Neon database support"
   git push
   ```

2. Netlify will automatically rebuild with the new code
3. Make sure `DATABASE_URL` environment variable is set in Netlify (Step 2)

4. After deployment, visit: `https://your-site.netlify.app/admin`
5. Try editing a product - it should work! 🎉

## 🎯 What Works Now

✅ **Admin Panel:**
- ✅ Edit product name, price, description, category, tags, featured status
- ✅ Changes save immediately to Neon database
- ✅ Works on both local and Netlify!

⚠️ **Image Upload:**
- ⚠️ Image upload still uses file system (won't work on Netlify)
- ✅ You can still manually add images to `/public/products/` and push to GitHub
- 💡 For full image upload support, consider Cloudinary (we can add this later)

## 🔍 Troubleshooting

### "Error: Failed to load products"
- Check `DATABASE_URL` environment variable is set correctly
- Verify connection string format (should start with `postgresql://`)
- Make sure products table exists in Neon

### "Product not found" when editing
- Make sure products were migrated to database
- Check that product IDs match between JSON and database

### Migration script doesn't run
- Make sure `.env.local` has `DATABASE_URL` set
- Check that `@neondatabase/serverless` package is installed
- Try: `node --experimental-modules src/scripts/migrate-products.js`

## 📊 Verify Database Connection

Test your connection in Neon SQL Editor:
```sql
SELECT COUNT(*) FROM products;
```

Should return the number of products you migrated.

## 🚀 Next Steps

Once everything works:
1. ✅ Admin panel can edit products (done!)
2. 💡 Consider adding Cloudinary for image uploads (optional)
3. ✅ Your site is fully functional with Neon database!

---

**Need Help?** Check the Neon documentation: https://neon.tech/docs
