# AJWG Portfolio

A futuristic, animated personal portfolio website showcasing design and development projects.

## Features

- **Dynamic Project Loading**: Projects are loaded from `projects.json` for easy content management
- **Responsive Design**: Optimized for all devices and screen sizes
- **Interactive Modals**: Full project details with image galleries and navigation
- **Smooth Animations**: Loading states, hover effects, and scroll animations
- **Brand Integration**: Custom color scheme (#1546C7 blue and #EC3499 pink)

## Technical Implementation

- **Background**: Single static background image (`background-portfolio.png`) with fixed attachment
- **Image Display**: Modal images use `object-fit: contain` for full viewing without cropping
- **Interactive Elements**: Images are clickable to open full-size versions in new tabs
- **Loading States**: Branded loading spinner and error handling for better UX
- **Contact Form**: Right-aligned submit button for optimal layout

## Deployment

### GitHub Pages
1. Push all files to your repository
2. Enable GitHub Pages in repository settings
3. Select main branch and root folder
4. Access your live site at: `https://ajwg.studio.github.io/[repository-name]`

### Quick Deploy
Use the provided `deploy.sh` script:
```bash
bash deploy.sh
```

## Asset Structure

All media files are stored in the `assets/` folder in the GitHub repository:
- Project cover images
- Project detail images  
- Logo files
- Background images

## Local Development

For local testing, start a simple HTTP server:
```bash
python -m http.server 8000
```

Note: Images will show placeholders locally since assets are in the GitHub repository.

## Contact

- **Email**: ajue.wing@gmail.com
- **GitHub**: ajwg.studio