#!/bin/bash
# Quick deployment script for GitHub Pages

echo "Deploying portfolio to GitHub..."

# Add all files
git add .

# Commit with timestamp
git commit -m "Update portfolio - Fixed loading issues and media fallbacks $(date)"

# Push to main branch
git push origin main

echo "Portfolio deployed! Check your GitHub Pages URL."
echo "Remember to enable GitHub Pages in your repository settings if not already done."