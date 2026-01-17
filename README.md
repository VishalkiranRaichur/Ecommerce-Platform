
# Sujatha Boutique – Product Catalog Web App

A modern, responsive **product catalog web application** built using **Next.js (App Router)** and **Tailwind CSS**.
This project demonstrates real-world frontend development skills, including component-based architecture, dynamic routing, responsive UI design, and deployment readiness.

The application is intentionally built as a **catalog-only platform** (no checkout) to focus on **UI/UX, performance, and maintainable frontend engineering**.

---

## Features

* Modern, elegant UI with a premium fashion aesthetic
* Home page with hero section and featured products
* Shop page with search, filter, and sort functionality
* Dynamic product detail pages using Next.js routing
* WhatsApp and Instagram contact integration
* Contact page with mailto support
* Fully responsive, mobile-first design
* Optimized images using Next.js Image component
* Admin panel for managing products and images
* Production-ready deployment setup

---

## Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** JavaScript
* **Styling:** Tailwind CSS
* **Fonts:** Inter, Playfair Display
* **Data Management:** Local JSON data store
* **Deployment:** Vercel / Netlify

---

## Project Structure

```
/
├── public/
│   └── products/            # Product images
├── src/
│   ├── app/
│   │   ├── layout.js        # Root layout
│   │   ├── page.js          # Home page
│   │   ├── shop/
│   │   │   └── page.js      # Shop page
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.js  # Product detail page
│   │   ├── about/
│   │   └── contact/
│   ├── components/          # Reusable UI components
│   └── data/
│       └── products.js      # Product data
└── package.json
```

---

## Admin Panel

The project includes a basic admin panel to simulate real-world content management workflows.

### Admin Features

* Edit product details (name, price, description, category)
* Upload and manage product images
* Mark products as featured
* Manage product tags

### Notes

* Data is stored locally in a JSON file
* Designed for frontend architecture and CRUD workflow demonstration
* File-write functionality is limited on serverless platforms

---

## Setup Instructions

### Prerequisites

* Node.js 18+
* npm or yarn

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Deployment

This project is deployment-ready.

* **Recommended:** Vercel (best support for Next.js)
* **Supported:** Netlify (with file-write limitations)

### Steps

1. Push the repository to GitHub
2. Import the project into Vercel or Netlify
3. Deploy using default Next.js settings

---

## Purpose of This Project

This project was built to demonstrate:

* Component-based frontend architecture
* Dynamic routing with Next.js App Router
* Responsive UI development using Tailwind CSS
* Real-world product catalog workflows
* Deployment-ready frontend engineering

---

## Future Improvements

* Backend integration (Supabase / Firebase)
* Authentication for admin panel
* CMS-based product management
* Animations using Framer Motion

---

## License

Open-source and free to use for learning and portfolio purposes.

---

## Author

**Vishalkiran Raichur**
GitHub: [https://github.com/VishalkiranRaichur](https://github.com/VishalkiranRaichur)

---
