#!/bin/bash

# Setup script for ugo-strategy-site GitHub deployment
# Run this after creating the GitHub repository

set -e

echo "🚀 Setting up ugo-strategy-site for deployment..."

# Add GitHub remote
git remote add origin https://github.com/ugoagbai/ugo-strategy-site.git

echo "✅ Remote added"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import 'ugo-strategy-site' repository"
echo "3. Click Deploy"
echo ""
echo "Your site will be live at: https://ugo-strategy-site.vercel.app"
