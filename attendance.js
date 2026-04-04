// SecureCourse Attendance Page - attendance.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('SecureCourse Attendance Page Loaded');

    // Initialize hamburger menu for mobile
    initializeHamburgerMenu();

    // Initialize dropdown menu
    initializeDropdownMenu();

    // Check if user is logged in
    checkUserLogin();

    // Initialize date selector
    initializeDateSelector();

    // Initialize attendance data
    loadAttendanceData();
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
            
            // Load attendance for selected date
            const selectedDate = this.querySelector('span').textContent;
            console.log('Selected date:', selectedDate);
            loadAttendanceData(selectedDate);
        });
    });
}

// Load attendance data
function loadAttendanceData(date = null) {
    const logs = document.querySelectorAll('.log-card');
    
    console.log('Loading attendance data for date:', date);
    
    // Add click handlers to log cards for details
    logs.forEach(log => {
        log.addEventListener('click', function() {
            console.log('Attendance log clicked');
        });
    });
}

// Calculate attendance statistics
function calculateAttendanceStats() {
    const logCards = document.querySelectorAll('.log-card');
    let presentCount = 0;
    let absentCount = 0;
    
    logCards.forEach(card => {
        if (card.querySelector('.status-badge.present')) {
            presentCount++;
        } else if (card.querySelector('.status-badge.absent')) {
            absentCount++;
        }
    });
    
    return {
        present: presentCount,
        absent: absentCount,
        total: presentCount + absentCount,
        percentage: Math.round((presentCount / (presentCount + absentCount)) * 100)
    };
}

// Export attendance data
function exportAttendanceData() {
    const stats = calculateAttendanceStats();
    console.log('Attendance Statistics:', stats);
    alert(`Attendance: ${stats.percentage}% Present (${stats.present}/${stats.total})`);
}

// Logout functionality
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = './login.html';
}

window.logout = logout;
window.exportAttendanceData = exportAttendanceData;
