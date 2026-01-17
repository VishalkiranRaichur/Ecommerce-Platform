# Sujatha Boutique - Product Catalog Website

A modern, elegant women's boutique product catalog website built with Next.js, Tailwind CSS, and JavaScript. This is a catalog-only website (no e-commerce functionality) where customers can browse products and contact via WhatsApp or Instagram DM.

## Features

- 🎨 Premium, elegant feminine design
- 🏠 Home page with hero section, featured products, and categories
- 🛍️ Shop page with search, filter, and sort functionality
- 📱 Product detail pages with image gallery
- 📞 WhatsApp and Instagram integration
- 📧 Contact form (opens mailto)
- 📱 Fully responsive, mobile-first design
- ⚡ Optimized images with Next.js Image component
- 🚀 Ready for Vercel deployment

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** JavaScript (NOT TypeScript)
- **Styling:** Tailwind CSS
- **Fonts:** Inter (body) + Playfair Display (headings)
- **Deployment:** Vercel-ready

## Setup Instructions

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/
├── public/
│   └── products/          # Product images go here
├── src/
│   ├── app/
│   │   ├── layout.js      # Root layout with fonts
│   │   ├── page.js        # Home page
│   │   ├── globals.css    # Global styles
│   │   ├── shop/
│   │   │   └── page.js    # Shop page
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.js # Product detail page
│   │   ├── about/
│   │   │   └── page.js    # About page
│   │   └── contact/
│   │       └── page.js    # Contact page
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   ├── Badge.js
│   │   ├── SearchBar.js
│   │   ├── Filters.js
│   │   ├── WhatsAppButton.js
│   │   └── InstagramButton.js
│   └── data/
│       └── products.js    # Product data array
└── package.json
```

## Adding Product Images

1. Create the products directory (if it doesn't exist):
   ```bash
   mkdir -p public/products
   ```

2. Add your product images to `/public/products/`
   - Name them according to the `images` array in `products.js`
   - For example: `blouse-1-main.jpg`, `blouse-1-1.jpg`, etc.
   - Supported formats: JPG, PNG, WebP, AVIF

3. The website will automatically show placeholder images if an image is missing

## Managing Products

Edit `/src/data/products.js` to add, remove, or modify products.

### Product Object Structure

```javascript
{
  id: 1,                              // Unique number
  name: 'Product Name',               // Display name
  slug: 'product-name',               // URL-friendly slug (must be unique)
  price: 2499,                        // Price in INR (number)
  category: 'Blouses',                // Category: 'Blouses', 'Festive', 'Bridal', 'New Arrivals'
  description: 'Product description', // Full description
  images: ['image-1.jpg', 'image-2.jpg'], // Array of image filenames (in /public/products/)
  tags: ['tag1', 'tag2'],             // Array of tags for search
  featured: true,                     // Boolean: show on home page?
}
```

### Adding a New Product

1. Add a new object to the `products` array in `products.js`
2. Ensure `slug` is unique
3. Add corresponding images to `/public/products/`
4. The product will appear automatically on the shop page

### Updating Product Details

- Edit the product object in `products.js`
- Changes reflect immediately (after refresh in development)

## Customization

### WhatsApp Number

Update the WhatsApp phone number in:
- `/src/components/Footer.js`
- `/src/components/WhatsAppButton.js`
- `/src/app/product/[slug]/page.js`
- `/src/app/contact/page.js`
- `/src/app/about/page.js`

Change `phoneNumber="+911234567890"` to your actual WhatsApp number.

### Instagram Username

Update the Instagram username in:
- `/src/components/Footer.js`
- `/src/components/InstagramButton.js`
- `/src/app/product/[slug]/page.js`
- `/src/app/contact/page.js`
- `/src/app/about/page.js`

Change `username="sujathaboutique"` to your actual Instagram username.

### Email Address

Update the email in `/src/app/contact/page.js`:
- Change `info@sujathaboutique.com` to your email
- Update the mailto link in the form submission

### Colors & Styling

Edit `/tailwind.config.js` to customize:
- Color scheme (primary colors)
- Font families
- Theme settings

Edit `/src/app/globals.css` for:
- Custom component styles
- Global CSS rules

## Deployment

### Deploy to Netlify (Free Domain)

See **[NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md)** for detailed Netlify deployment instructions.

**Quick Steps:**
1. Push your code to GitHub
2. Sign up at [netlify.com](https://netlify.com)
3. Import your GitHub repository
4. Netlify auto-detects Next.js settings
5. Deploy and get a free domain!

**Note:** Admin panel write functionality (editing products, uploading images) requires file system access which is limited on Netlify. Consider using Vercel for full admin panel functionality, or edit products locally and redeploy.

### Deploy to Vercel (Recommended for Admin Panel)

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "New Project"

4. Import your GitHub repository

5. Vercel will automatically detect Next.js and configure the project

6. Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)

2. Click "Add New..." → "Project"

3. Import your Git repository or upload the project folder

4. Vercel auto-detects Next.js settings

5. Click "Deploy"

### Post-Deployment

After deployment, update your WhatsApp and Instagram links if needed, and verify all images are loading correctly.

## Environment Variables

No environment variables are required for this project. All configuration is in the code files.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Images are optimized automatically using Next.js Image component
- Fonts are loaded with `next/font` for optimal performance
- Client-side navigation for fast page transitions
- Minimal JavaScript bundle size

## Troubleshooting

### Images Not Showing

- Ensure images are in `/public/products/`
- Check that filenames match exactly (case-sensitive)
- The site will show a placeholder if images are missing

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version (should be 18+)

### Styling Issues

- Ensure Tailwind CSS is properly configured
- Check that `postcss.config.js` exists
- Verify `tailwind.config.js` paths are correct

## Admin Panel

The website includes a powerful admin panel for managing products, uploading images, and updating product information.

### Accessing the Admin Panel

1. Navigate to `/admin` in your browser (e.g., `http://localhost:3000/admin`)

2. Login with the default password: `admin123`
   - ⚠️ **Important:** Change the password in production by setting the `ADMIN_PASSWORD` environment variable

3. Once logged in, you'll see all products with options to:
   - Edit product details (name, price, description, category)
   - Upload product images (up to 40 images supported)
   - Remove images from products
   - Mark products as featured
   - Update tags

### Changing the Admin Password

Create a `.env.local` file in the project root:

```bash
ADMIN_PASSWORD=your-secure-password-here
```

### Admin Panel Features

- **Product Management:** Edit name, price, description, category, tags, and featured status
- **Image Upload:** Upload images directly through the web interface (JPEG, PNG, WebP up to 5MB)
- **Image Management:** View all product images, remove unwanted images
- **Database:** All changes are saved to `src/data/products.json`
- **No Design Changes:** Admin panel uses the same elegant design system as the main site

### Image Upload Limits

- Supported formats: JPEG, JPG, PNG, WebP
- Maximum file size: 5MB per image
- Images are stored in `/public/products/`
- Recommended: Keep images optimized for web (under 1MB each)

### How It Works

- Products are stored in a JSON file (`src/data/products.json`) which serves as a simple database
- Images are uploaded to `/public/products/` directory
- Changes are saved immediately and persist after page refresh
- The frontend automatically loads products from the JSON database

## License

This project is open source and available for your use.

## Support

For questions or issues, please contact via WhatsApp or Instagram using the links in the website footer.

---

Built with ❤️ using Next.js and Tailwind CSS
