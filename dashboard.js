// SecureCourse Dashboard - dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('SecureCourse Dashboard Loaded');

    // Initialize hamburger menu for mobile
    initializeHamburgerMenu();

    // Initialize dropdown menu
    initializeDropdownMenu();

    // Check if user is logged in
    checkUserLogin();

    // Add current date
    updateCurrentDate();

    // Initialize profile menu toggle
    initializeProfileMenu();
});

// Hamburger menu initialization
function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        });
    }

    // Close sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            this.classList.remove('active');
        });
    }

    // Close sidebar when clicking on nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        });
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.sidebar') && !e.target.closest('.hamburger-menu')) {
            sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        }
    });
}

// Dropdown menu initialization
function initializeDropdownMenu() {
    const profileMenu = document.querySelector('.profile-menu');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (profileMenu && dropdownContent) {
        profileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownContent.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.profile-menu')) {
                dropdownContent.classList.remove('active');
            }
        });

        // Close dropdown when clicking on items
        dropdownContent.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', function() {
                dropdownContent.classList.remove('active');
            });
        });
    }
}

// Check if user is logged in
function checkUserLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        // Redirect to login if not logged in
        window.location.href = './login.html';
    }

    // Display user info if available
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        console.log('User logged in as:', userEmail);
    }
}

// Update current date
function updateCurrentDate() {
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Profile menu toggle
function initializeProfileMenu() {
    const profileMenu = document.querySelector('.profile-menu');
    if (profileMenu) {
        profileMenu.style.cursor = 'pointer';
        profileMenu.addEventListener('click', function() {
            console.log('Profile menu clicked');
        });
    }
}

// Logout functionality
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = './login.html';
}

// Export logout function for HTML onclick
window.logout = logout;
