// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typing Effect for Hero Section
  const typingWords = [
    'Visual Futures',
    'Intuitive Systems', 
    'Digital Stories',
    'Immersive Brands',
    'Human Interfaces',
    'AI Experiences'
  ];
  
  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  const typingElement = document.querySelector('.typing-text');
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  function typeEffect() {
    const currentWord = typingWords[currentWordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, currentCharIndex - 1);
      currentCharIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, currentCharIndex + 1);
      currentCharIndex++;
    }

    let typeDelay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && currentCharIndex === currentWord.length) {
      typeDelay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % typingWords.length;
    }

    setTimeout(typeEffect, typeDelay);
  }

  // Start typing effect
  typeEffect();

  // Load and display projects from JSON
  async function loadProjects() {
    try {
      const response = await fetch('projects.json');
      const data = await response.json();
      displayProjects(data.projects);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }

  function displayProjects(projects) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    portfolioGrid.innerHTML = '';
    
    projects.forEach(project => {
      const projectItem = document.createElement('div');
      projectItem.className = 'portfolio-item';
      projectItem.setAttribute('data-modal', project.id);
      
      projectItem.innerHTML = `
        <img src="${project.coverImage}" alt="${project.title}" class="portfolio-img" loading="lazy">
        <div class="portfolio-overlay">
          <h3>${project.title}</h3>
          <p>${project.tech.join(' • ')}</p>
        </div>
      `;
      
      portfolioGrid.appendChild(projectItem);
      
      // Create modal for this project
      createProjectModal(project);
    });
    
    // Re-initialize portfolio click handlers
    initializePortfolioHandlers();
  }

  function createProjectModal(project) {
    const modalContainer = document.querySelector('.footer');
    const modal = document.createElement('div');
    modal.id = project.id;
    modal.className = 'modal';
    
    let framesHtml = '';
    project.frames.forEach((frame, index) => {
      const mediaHtml = frame.video 
        ? `<video src="${frame.video}" class="modal-img" controls></video>`
        : `<img src="${frame.image}" alt="${frame.section}" class="modal-img">`;
      
      framesHtml += `
        <div class="frame-section" ${index > 0 ? 'style="display: none;"' : ''}>
          ${mediaHtml}
          <div class="modal-text">
            <h3>${frame.section}</h3>
            <p>${frame.text.replace(/\\n/g, '<br>')}</p>
          </div>
        </div>
      `;
    });
    
    const techList = project.tech.map(tech => `<li>${tech}</li>`).join('');
    
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <div class="modal-header">
          <h2>${project.title}</h2>
        </div>
        ${framesHtml}
        <div class="modal-footer">
          <ul class="modal-tech">${techList}</ul>
          <div class="modal-buttons">
            <a href="${project.demoUrl}" class="btn btn-outline" target="_blank">Live Demo</a>
            <a href="${project.sourceUrl}" class="btn btn-primary" target="_blank">Source Code</a>
          </div>
        </div>
        <div class="modal-navigation">
          <button class="btn-nav prev-frame" onclick="changeFrame(-1)">← Previous</button>
          <span class="frame-counter">1 / ${project.frames.length}</span>
          <button class="btn-nav next-frame" onclick="changeFrame(1)">Next →</button>
        </div>
      </div>
    `;
    
    modalContainer.insertAdjacentElement('beforebegin', modal);
  }

  function initializePortfolioHandlers() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const modalId = item.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
          setTimeout(() => {
            modal.classList.add('show');
          }, 10);
        }
      });
    });

    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.classList.remove('show');
        setTimeout(() => {
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }, 300);
      });
    });

    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
          setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
          }, 300);
        }
      });
    });
  }
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Sticky Navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.about, .portfolio, .contact, .section-title, .skills, .contact-info, .contact-form');
  
  const revealOnScroll = () => {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('fade-in', 'visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Check on load

  // Back to Top Button
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Form Validation
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      
      if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      alert('Message sent successfully! I will get back to you soon.');
      contactForm.reset();
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Global function for modal frame navigation
  window.changeFrame = function(direction) {
    const activeModal = document.querySelector('.modal.show');
    if (!activeModal) return;
    
    const frames = activeModal.querySelectorAll('.frame-section');
    const counter = activeModal.querySelector('.frame-counter');
    let currentIndex = 0;
    
    frames.forEach((frame, index) => {
      if (frame.style.display !== 'none') {
        currentIndex = index;
      }
      frame.style.display = 'none';
    });
    
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = frames.length - 1;
    if (currentIndex >= frames.length) currentIndex = 0;
    
    frames[currentIndex].style.display = 'block';
    counter.textContent = `${currentIndex + 1} / ${frames.length}`;
  };

});
