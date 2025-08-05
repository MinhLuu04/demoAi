// Global variables
let currentChapter = 1;
const totalChapters = 7;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateChapterIndicator();
});

// Initialize the application
function initializeApp() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Keyboard navigation for book
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            previousChapter();
        } else if (e.key === 'ArrowRight') {
            nextChapter();
        }
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(139, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(139, 0, 0, 0.95)';
        }
    });
}

// Book navigation functions
function nextChapter() {
    if (currentChapter < totalChapters) {
        currentChapter++;
        showChapter(currentChapter);
        updateChapterIndicator();
    }
}

function previousChapter() {
    if (currentChapter > 1) {
        currentChapter--;
        showChapter(currentChapter);
        updateChapterIndicator();
    }
}

function showChapter(chapterNumber) {
    // Hide all chapters
    document.querySelectorAll('.chapter').forEach(chapter => {
        chapter.classList.remove('active');
    });

    // Show the current chapter
    const currentChapterElement = document.getElementById(`chapter-${chapterNumber}`);
    if (currentChapterElement) {
        currentChapterElement.classList.add('active');
        
        // Add entrance animation
        currentChapterElement.style.animation = 'none';
        currentChapterElement.offsetHeight; // Trigger reflow
        currentChapterElement.style.animation = 'fadeIn 0.5s ease-in';
    }
}

function updateChapterIndicator() {
    const currentChapterElement = document.getElementById('current-chapter');
    const totalChaptersElement = document.getElementById('total-chapters');
    
    if (currentChapterElement) {
        currentChapterElement.textContent = currentChapter;
    }
    
    if (totalChaptersElement) {
        totalChaptersElement.textContent = totalChapters;
    }

    // Update button states
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentChapter === 1;
        prevBtn.style.opacity = currentChapter === 1 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentChapter === totalChapters;
        nextBtn.style.opacity = currentChapter === totalChapters ? '0.5' : '1';
    }
}

// Utility functions
function openBook() {
    const bookSection = document.getElementById('book');
    if (bookSection) {
        bookSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Contact form handling
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const message = e.target.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Đang gửi tin nhắn...', 'info');
    
    setTimeout(() => {
        showNotification('Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại sớm.', 'success');
        e.target.reset();
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(139, 0, 0, 0.95);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 20px 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 15px 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(style);

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to principle boxes
    document.querySelectorAll('.principle-box').forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title .kanji-large');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add parallax effect to cherry blossoms
    window.addEventListener('scroll', function() {
        const cherryBlossoms = document.querySelector('.cherry-blossoms');
        if (cherryBlossoms) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            cherryBlossoms.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Export functions for global access
window.nextChapter = nextChapter;
window.previousChapter = previousChapter;
window.openBook = openBook;
window.scrollToSection = scrollToSection; 