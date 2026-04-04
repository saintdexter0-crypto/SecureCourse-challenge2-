// SecureCourse Timetable Page - timetable.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('SecureCourse Timetable Page Loaded');

    // Initialize hamburger menu for mobile
    initializeHamburgerMenu();

    // Initialize dropdown menu
    initializeDropdownMenu();

    // Check if user is logged in
    checkUserLogin();

    // Initialize date selector
    initializeDateSelector();

    // Initialize timetable data
    loadTimetableData();
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

// Initialize date selector
function initializeDateSelector() {
    const dateItems = document.querySelectorAll('.date-item');
    
    dateItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            dateItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Load timetable for selected date
            const selectedDate = this.querySelector('span').textContent;
            console.log('Selected date:', selectedDate);
            loadTimetableData(selectedDate);
        });
    });
}

// Load timetable data
function loadTimetableData(date = null) {
    const classCards = document.querySelectorAll('.class-card');
    
    console.log('Loading timetable data for date:', date);
    
    // Add click handlers to class cards
    classCards.forEach(card => {
        card.addEventListener('click', function() {
            const courseCode = this.querySelector('.course-code')?.textContent;
            const courseTitle = this.querySelector('.course-title')?.textContent;
            const time = this.querySelector('.class-time')?.textContent;
            
            console.log('Class selected:', { courseCode, courseTitle, time });
        });
    });
}

// Sort classes by time
function sortClassesByTime() {
    const classContainer = document.querySelector('.class-list');
    if (!classContainer) return;

    const classes = Array.from(document.querySelectorAll('.class-card'));
    
    classes.sort((a, b) => {
        const timeA = a.querySelector('.class-time')?.textContent || '';
        const timeB = b.querySelector('.class-time')?.textContent || '';
        return timeA.localeCompare(timeB);
    });
    
    classes.forEach(cls => classContainer.appendChild(cls));
    console.log('Classes sorted by time');
}

// Get today's classes
function getTodaysClasses() {
    const dateItems = document.querySelectorAll('.date-item');
    let todayDate = null;
    
    dateItems.forEach(item => {
        if (item.classList.contains('active')) {
            todayDate = item.querySelector('span').textContent;
        }
    });
    
    return todayDate;
}

// Export timetable
function exportTimetable() {
    const classCards = document.querySelectorAll('.class-card');
    const timetable = [];
    
    classCards.forEach(card => {
        timetable.push({
            code: card.querySelector('.course-code')?.textContent,
            title: card.querySelector('.course-title')?.textContent,
            location: card.querySelector('.location')?.textContent,
            time: card.querySelector('.class-time')?.textContent
        });
    });
    
    console.log('Timetable export:', timetable);
    alert(`Exported ${timetable.length} classes`);
}

// Logout functionality
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = './login.html';
}

window.logout = logout;
window.exportTimetable = exportTimetable;
