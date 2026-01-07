/* ============================================
   SPARKAFRICA - JAVASCRIPT
   ============================================ */

// ============================================
// Navigation Toggle
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(13px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-13px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// ============================================
// Scroll to Top Button
// ============================================

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInUp 0.6s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.pillar-card, .program-card, .involvement-card, .impact-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes countUp {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Newsletter Form Handling
// ============================================

const newsletterForm = document.getElementById('newsletterForm');
const footerNewsletterForm = document.getElementById('footerNewsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        handleNewsletterSubmit(email, newsletterForm);
    });
}

if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = footerNewsletterForm.querySelector('input[type="email"]').value;
        handleNewsletterSubmit(email, footerNewsletterForm);
    });
}

function handleNewsletterSubmit(email, form) {
    // Simulate form submission
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = '✓ Subscribed!';
    button.style.background = 'var(--tertiary-color)';
    button.disabled = true;
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
        form.reset();
    }, 2000);
    
    // Log for demonstration
    console.log('Newsletter subscription:', email);
}

// ============================================
// Parallax Effect on Hero Section
// ============================================

const hero = document.querySelector('.hero');
const shapes = document.querySelectorAll('.gradient-shape');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// ============================================
// Navbar Background on Scroll
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
});

// ============================================
// Count Up Animation for Stats
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const startTime = Date.now();
    
    function update() {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    update();
}

// Observe stat numbers for counting animation
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent.trim();
            let target = 0;
            
            // Extract number from text
            const numberMatch = text.match(/\d+/);
            if (numberMatch) {
                target = parseInt(numberMatch[0]);
                animateCounter(entry.target, target, 1500);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// Lazy Loading for Images (Future Use)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Mobile Responsive Adjustments
// ============================================

function adjustForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce animation complexity on mobile
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animationDuration = '0.5s';
        });
    }
}

window.addEventListener('resize', adjustForMobile);
adjustForMobile();

// ============================================
// Form Validation Helper
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add real-time validation to newsletter forms
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#FF6B35';
        } else {
            this.style.borderColor = '';
        }
    });
});

// ============================================
// Performance: Debounce Scroll Events
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Accessibility: Skip to Content Link
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey) {
        // Handle skip to content functionality
        const mainContent = document.querySelector('main') || document.querySelector('section');
        if (mainContent) {
            mainContent.tabIndex = -1;
            mainContent.focus();
        }
    }
});

// ============================================
// Theme Preference Detection
// ============================================

function detectColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

detectColorScheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectColorScheme);

// ============================================
// Performance Optimization: RequestAnimationFrame for smooth scrolling
// ============================================

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Update scroll-dependent elements here
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// Initialization on DOM Ready
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Log initialization
    console.log('SparkAfrica website initialized');
    
    // Add 'loaded' class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Initialize tooltips if needed
    initializeTooltips();
});

function initializeTooltips() {
    // Placeholder for future tooltip functionality
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            this.appendChild(tooltip);
        });
        
        el.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

// ============================================
// Export for testing (if needed)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        debounce,
        detectColorScheme
    };
}

// ============================================
// Console Message
// ============================================

console.log('%c🚀 Welcome to SparkAfrica!', 'font-size: 24px; color: #FF6B35; font-weight: bold;');
console.log('%cBuilding an Inclusive Digital Future for Africa', 'font-size: 14px; color: #004E89;');
