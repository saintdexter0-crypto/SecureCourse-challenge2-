// SecureCourse Login Page - login.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('SecureCourse Login Page Loaded');
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signInBtn = document.querySelector('.signin-btn');
    const form = document.querySelector('form');

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Password validation
    function validatePassword(password) {
        return password.length >= 8;
    }

    // Form validation on input change
    function validateForm() {
        const emailValid = emailInput.value && validateEmail(emailInput.value);
        const passwordValid = passwordInput.value && validatePassword(passwordInput.value);
        
        if (emailValid && passwordValid) {
            signInBtn.style.opacity = '1';
            signInBtn.style.cursor = 'pointer';
            signInBtn.disabled = false;
        } else {
            signInBtn.style.opacity = '0.5';
            signInBtn.style.cursor = 'not-allowed';
            signInBtn.disabled = true;
        }
    }

    if (emailInput) emailInput.addEventListener('input', validateForm);
    if (passwordInput) passwordInput.addEventListener('input', validateForm);

    // Form submission handler
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value;
            const password = passwordInput.value;

            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            if (!validatePassword(password)) {
                alert('Password must be at least 8 characters long');
                return;
            }

            // Store login data in localStorage
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');

            console.log('Login successful for:', email);
            // Redirect to dashboard
            window.location.href = './dashboard.html';
        });
    }

    // Show/hide password toggle
    const passwordToggle = document.createElement('button');
    passwordToggle.type = 'button';
    passwordToggle.textContent = 'Show';
    passwordToggle.className = 'password-toggle';
    
    if (passwordInput) {
        passwordInput.parentElement.appendChild(passwordToggle);
        
        passwordToggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.textContent = 'Hide';
            } else {
                passwordInput.type = 'password';
                this.textContent = 'Show';
            }
        });
    }

    // Initialize form validation
    validateForm();
});
