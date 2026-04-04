// SecureCourse Registration Page - registration.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('SecureCourse Registration Page Loaded');

    // Initialize hamburger menu for mobile
    initializeHamburgerMenu();

    // Initialize dropdown menu
    initializeDropdownMenu();

    // Check if user is logged in
    checkUserLogin();

    // Initialize course selection
    initializeCourseSelection();

    // Initialize course search/filter
    initializeCourseFilter();
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

// Initialize course selection
function initializeCourseSelection() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        const checkbox = card.querySelector('.custom-checkbox');
        
        if (checkbox) {
            card.addEventListener('click', function() {
                this.classList.toggle('selected');
                checkbox.classList.toggle('checked');
                console.log('Course selection toggled');
            });
        }
    });
}

// Initialize course filter/search
function initializeCourseFilter() {
    const filterInput = document.querySelector('.course-filter-input');
    
    if (filterInput) {
        filterInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const courseCards = document.querySelectorAll('.course-card');
            
            courseCards.forEach(card => {
                const courseName = card.querySelector('.course-name')?.textContent.toLowerCase() || '';
                const courseCode = card.querySelector('.course-code')?.textContent.toLowerCase() || '';
                
                if (courseName.includes(searchTerm) || courseCode.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Get selected courses
function getSelectedCourses() {
    const selectedCards = document.querySelectorAll('.course-card.selected');
    const selectedCourses = [];
    
    selectedCards.forEach(card => {
        const code = card.querySelector('.course-code')?.textContent;
        const name = card.querySelector('.course-name')?.textContent;
        selectedCourses.push({ code, name });
    });
    
    return selectedCourses;
}

// Submit registration
function submitRegistration() {
    const selectedCourses = getSelectedCourses();
    
    if (selectedCourses.length === 0) {
        alert('Please select at least one course');
        return;
    }
    
    console.log('Registered courses:', selectedCourses);
    alert(`Successfully registered for ${selectedCourses.length} course(s)`);
}

// Logout functionality
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = './login.html';
}

window.logout = logout;
window.submitRegistration = submitRegistration;
