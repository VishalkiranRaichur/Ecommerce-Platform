# Deploy Sujatha Boutique to Netlify

This guide will help you deploy your boutique website to Netlify with a free domain.

## Prerequisites

- GitHub account (free)
- Netlify account (free)
- Your project files ready

## Step 1: Push Your Code to GitHub

### Option A: Create a New GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it: `sujatha-boutique` (or any name you like)
4. Set it to **Public** or **Private** (your choice)
5. Click **"Create repository"**

### Option B: Push Your Code Using Terminal

1. Open terminal in your project folder:
   ```bash
   cd "/Users/vishalkiranshreenivasraichur/Desktop/Sujatha Boutique"
   ```

2. Initialize git (if not already done):
   ```bash
   git init
   ```

3. Add all files:
   ```bash
   git add .
   ```

4. Commit:
   ```bash
   git commit -m "Initial commit - Sujatha Boutique website"
   ```

5. Add your GitHub repository (replace `YOUR_USERNAME` with your GitHub username):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/sujatha-boutique.git
   ```

6. Push to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Netlify

### Method 1: Deploy via GitHub (Recommended)

1. Go to [netlify.com](https://netlify.com) and sign up/login (use "Sign up with GitHub" for easier setup)

2. Click **"Add new site"** → **"Import an existing project"**

3. Click **"Deploy with GitHub"** and authorize Netlify

4. Select your repository: `sujatha-boutique`

5. Netlify will auto-detect Next.js settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - ✅ These should be auto-filled correctly

6. Click **"Deploy site"**

7. Wait for the build to complete (2-5 minutes)

8. Your site will be live at: `https://random-name.netlify.app`

### Method 2: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. In your project folder, deploy:
   ```bash
   netlify deploy --prod
   ```

4. Follow the prompts to link your site

## Step 3: Configure Custom Domain (Free)

1. In Netlify dashboard, click your site

2. Go to **"Domain settings"** → **"Add custom domain"**

3. You can either:
   - Use a Netlify subdomain: `sujatha-boutique.netlify.app` (free, always available)
   - Or connect your own domain (if you have one)

4. Netlify will provide a free subdomain automatically: `your-site-name.netlify.app`

5. Your site is now live with a free domain! 🎉

## Step 4: Set Environment Variables (Optional)

If you changed the admin password, set it in Netlify:

1. Go to **Site settings** → **Environment variables**
2. Add new variable:
   - **Key:** `ADMIN_PASSWORD`
   - **Value:** `your-secure-password`
3. Click **"Save"**
4. Redeploy your site for changes to take effect

## Important Notes

### ✅ What Works on Netlify

- ✅ All pages (Home, Shop, Product Detail, About, Contact)
- ✅ Product catalog display
- ✅ Search and filter functionality
- ✅ WhatsApp and Instagram links
- ✅ Responsive design
- ✅ Image display (if images are uploaded to `/public/products/`)

### ⚠️ Admin Panel Limitation

**Note:** The admin panel's **write functionality** (editing products, uploading images) **won't work on Netlify** because Netlify's serverless functions have read-only file systems.

**Solutions:**

1. **Edit products locally, then redeploy:**
   - Edit `src/data/products.json` locally
   - Push changes to GitHub
   - Netlify will auto-redeploy

2. **Use Vercel instead** (recommended for admin panel):
   - Vercel has better support for file system operations
   - See `README.md` for Vercel deployment

3. **Use a database service** (for full admin functionality):
   - Consider using a service like MongoDB, Supabase, or Firebase
   - Would require code changes

### Image Upload Note

- Upload images manually to `/public/products/` folder
- Commit and push to GitHub
- Images will be available after redeployment

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test WhatsApp button (should open chat with `+917795855292`)
- [ ] Test Instagram button (should open `sujatha.m798` profile)
- [ ] Test product images display correctly
- [ ] Test search and filter functionality
- [ ] Test on mobile devices

## Updating Your Site

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update products"
   git push
   ```
3. Netlify will automatically rebuild and redeploy (usually takes 2-3 minutes)

## Support

If you encounter issues:
- Check Netlify build logs in the dashboard
- Verify all environment variables are set
- Make sure `netlify.toml` is in your project root
- Check that Node.js version is 18 or higher

---

**Your site is now live! 🎉 Share your Netlify URL with customers!**
