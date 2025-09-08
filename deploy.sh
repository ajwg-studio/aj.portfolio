#!/bin/bash
# Quick deployment script for GitHub Pages

echo "Deploying portfolio to GitHub..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
fi

# Check current remote
echo "Checking remote configuration..."
git remote -v

# Add all files
echo "Adding files..."
git add .

# Commit with timestamp
echo "Committing changes..."
git commit -m "Update portfolio - Fixed loading issues and media fallbacks $(date)"

# Try to push to main branch
echo "Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Portfolio deployed successfully!"
    echo "📋 Check your GitHub Pages URL in repository settings if not already configured."
else
    echo "❌ Push failed. You may need to:"
    echo "   1. Set up the correct remote URL"
    echo "   2. Authenticate with GitHub"
    echo "   3. Check your repository permissions"
fi