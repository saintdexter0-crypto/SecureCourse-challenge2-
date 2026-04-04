// SecureCourse Home Page - index.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('SecureCourse Home Page Loaded');
    
    // Smooth scroll behavior for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Portal card hover effects
    const studentPortal = document.querySelector('.student_portal');
    const staffPortal = document.querySelector('.staff');
    
    if (studentPortal) {
        studentPortal.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        studentPortal.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    if (staffPortal) {
        staffPortal.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        staffPortal.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // Animation on page load
    const header = document.querySelector('.header');
    if (header) {
        header.style.opacity = '0';
        header.style.animation = 'fadeInDown 0.8s ease forwards';
    }
});

// Animation keyframes added dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
