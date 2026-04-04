// SecureCourse Profile Page - profile.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('SecureCourse Profile Page Loaded');

    // Initialize hamburger menu for mobile
    initializeHamburgerMenu();

    // Initialize dropdown menu
    initializeDropdownMenu();

    // Check if user is logged in
    checkUserLogin();

    // Load user profile data
    loadProfileData();

    // Initialize edit profile functionality
    initializeEditProfile();
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

    if (overlay) {
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            this.classList.remove('active');
        });
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        });
    });

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

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.profile-menu')) {
                dropdownContent.classList.remove('active');
            }
        });

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
        window.location.href = './login.html';
    }
}

// Load profile data
function loadProfileData() {
    const userEmail = localStorage.getItem('userEmail');
    console.log('Loading profile for:', userEmail);

    // You can fetch profile data from an API here
    const profileData = {
        name: 'Kelvin Yeboah',
        email: userEmail || 'kelvin@example.com',
        handle: '@kelvin_yeboah',
        course: 'Computer Science',
        year: 'Year 3',
        indexNumber: '8989718'
    };

    // Update profile display
    const profileName = document.querySelector('.user-name');
    if (profileName) profileName.textContent = profileData.name;
}

// Initialize edit profile functionality
function initializeEditProfile() {
    const editButtons = document.querySelectorAll('.edit-btn');
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Implement edit functionality
            console.log('Edit profile clicked');
        });
    });
}

// Logout functionality
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = './login.html';
}

window.logout = logout;
