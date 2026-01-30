# Ruka Founder Site - Deployment Guide

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Local Development
```bash
npm run dev
```
Visit http://localhost:5173

### 3. Build for Production
```bash
npm run build
```

## Deployment to Vercel (Free Hosting)

### First Time Setup

1. **Create GitHub Repository**
   - Go to https://github.com/new
   - Repository name: `ruka-founder-site`
   - Click "Create repository"

2. **Push Code to GitHub**
   ```bash
   cd ruka-site
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ruka-founder-site.git
   git push -u origin main
   ```

3. **Deploy to Vercel**
   - Go to https://vercel.com/signup
   - Sign up with GitHub
   - Click "New Project"
   - Import `ruka-founder-site` repository
   - Click "Deploy" (Vercel auto-detects Vite settings)
   - Wait 2-3 minutes for deployment

4. **Get Your Live URL**
   - Vercel provides: `ruka-founder-site.vercel.app`
   - Note this URL for domain setup

### Connect Custom Domain

1. **In Vercel Dashboard**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain (e.g., `yourdomain.com`)
   - Vercel will provide DNS records

2. **In Squarespace**
   - Log into Squarespace
   - Go to Settings > Domains > [Your Domain] > DNS Settings
   - Add Vercel's DNS records:
     - Type: A Record
     - Name: @
     - Value: 76.76.21.21
     
     - Type: CNAME
     - Name: www
     - Value: cname.vercel-dns.com

3. **Wait for Propagation**
   - DNS changes take 24-48 hours
   - Vercel will auto-issue SSL certificate
   - Your site will be live at your custom domain

## Form Setup (Tally)

1. **Create Tally Form**
   - Go to https://tally.so
   - Sign up for free account
   - Create new form with fields:
     - Name (text)
     - Email (email)
     - Company/Project (text)
     - Inquiry Type (select: Strategy/Venture Scouting/Brand Architecture)
     - Message (long text)

2. **Get Embed Code**
   - Click "Share" on your form
   - Copy the embed URL (looks like: `https://tally.so/embed/YOUR_FORM_ID`)

3. **Update Code**
   - Open `src/App.jsx`
   - Find line with `data-tally-src="https://tally.so/embed/YOUR_FORM_ID..."`
   - Replace `YOUR_FORM_ID` with your actual Tally form ID
   - Commit and push changes (Vercel auto-deploys)

## Site Structure

- **Main Site**: `/` (index)
  - Full portfolio experience
  - Hero, Strategy, Speaking, Contact sections
  - Fully responsive

- **Mobile Bio Page**: `/bio.html`
  - Link-in-bio optimized layout
  - Quick links to main sections
  - Perfect for Instagram/social media

## Making Edits

### Content Changes
Edit `src/App.jsx`:
- **Colors**: Lines 6-10 (CSS variables)
- **Copy**: Search for text you want to change
- **Tagline**: Line 248
- **Services**: Lines 376-386
- **Speaking Events**: Lines 464-466

### After Edits
```bash
git add .
git commit -m "Update copy"
git push
```
Vercel automatically rebuilds and deploys in ~2 minutes.

## Colour Scheme Reference
Current matcha/cream palette:
- Primary Dark: `#3A4F1E`
- Primary Mid: `#5F8232`
- Primary Light: `#8BA855`
- Cream: `#F2F0E6`
- Cream Dim: `#D9D7CC`

To change, update variables in `src/App.jsx` lines 6-10.

## Cost Summary
- Hosting (Vercel): £0/month
- Form (Tally): £0/month (100 submissions)
- Domain: Your existing Squarespace cost
- **Total New Costs: £0**

## Support
- Vercel Docs: https://vercel.com/docs
- Tally Docs: https://tally.so/help
- Vite Docs: https://vitejs.dev
