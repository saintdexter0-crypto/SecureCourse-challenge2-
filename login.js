// SecureCourse Login Page - login.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('Login Page Loaded');
    
    // Get DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const signinBtn = document.getElementById('signinBtn');
    const errorMessage = document.getElementById('errorMessage');
    
    // Initially disable sign-in button
    signinBtn.disabled = true;
    
    // Function to check if form is valid and enable/disable button
    function checkFormValidity() {
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        const isEmailValid = email && emailRegex.test(email);
        const isPasswordValid = password && password.length >= 8;
        
        if (isEmailValid && isPasswordValid) {
            signinBtn.disabled = false;
        } else {
            signinBtn.disabled = true;
        }
    }
    
    // Password visibility toggle
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? 'Show' : 'Hide';
        });
    }
    
    // Input validation feedback
    emailInput.addEventListener('blur', function() {
        validateEmail(this);
    });
    
    emailInput.addEventListener('focus', function() {
        this.classList.remove('error');
        clearError();
    });
    
    passwordInput.addEventListener('blur', function() {
        validatePassword(this);
    });
    
    passwordInput.addEventListener('focus', function() {
        this.classList.remove('error');
        clearError();
    });
    
    // Real-time validation while typing
    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateEmail(this);
        }
        checkFormValidity();
    });
    
    passwordInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validatePassword(this);
        }
        checkFormValidity();
    });
    
    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Enter key to submit
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
    
    // Validation Functions
    function validateEmail(input) {
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError(input, 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }
        
        removeError(input);
        return true;
    }
    
    function validatePassword(input) {
        const password = input.value;
        
        if (!password) {
            showError(input, 'Password is required');
            return false;
        }
        
        if (password.length < 8) {
            showError(input, 'Password must be at least 8 characters');
            return false;
        }
        
        removeError(input);
        return true;
    }
    
    function showError(input, message) {
        input.classList.add('error');
        displayErrorMessage(message);
    }
    
    function removeError(input) {
        input.classList.remove('error');
    }
    
    function displayErrorMessage(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            
            // Auto-hide error message after 5 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    function clearError() {
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }
    
    // Login Handler
    function handleLogin() {
        // Clear previous errors
        clearError();
        emailInput.classList.remove('error');
        passwordInput.classList.remove('error');
        
        // Validate inputs
        const isEmailValid = validateEmail(emailInput);
        const isPasswordValid = validatePassword(passwordInput);
        
        if (!isEmailValid || !isPasswordValid) {
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        // Simulate API call (replace with actual backend call)
        setTimeout(() => {
            // For demo purposes, accept any valid email/password combination
            // In production, you would send credentials to your backend
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            // You can add your own login logic here
            console.log('Login attempt:', { email, password });
            
            // Simulated successful login
            setLoadingState(false);
            
            // Store user info in sessionStorage or localStorage if needed
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('loginTime', new Date().toISOString());
            
            // Show success message and redirect
            displaySuccessMessage();
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = './dashboard.html';
            }, 1000);
            
        }, 1500); // Simulate network delay
    }
    
    // Loading State Management
    function setLoadingState(isLoading) {
        if (isLoading) {
            signinBtn.classList.add('loading');
            signinBtn.disabled = true;
            emailInput.disabled = true;
            passwordInput.disabled = true;
        } else {
            signinBtn.classList.remove('loading');
            emailInput.disabled = false;
            passwordInput.disabled = false;
            // Re-check form validity to determine if button should be enabled
            checkFormValidity();
        }
    }
    
    function displaySuccessMessage() {
        errorMessage.style.backgroundColor = '#dcfce7';
        errorMessage.style.color = '#16a34a';
        errorMessage.style.borderLeftColor = '#16a34a';
        errorMessage.textContent = 'Login successful! Redirecting...';
        errorMessage.style.display = 'block';
    }
    
    // Auto-fill detection (helps with UX)
    emailInput.addEventListener('animationstart', function() {
        emailInput.classList.add('autofilled');
    });
    
    // Page animations
    const formWrapper = document.querySelector('.form-wrapper');
    const loginImageSide = document.querySelector('.login-image-side');
    
    if (formWrapper) {
        formWrapper.style.animation = 'slideInLeft 0.6s ease forwards';
    }
    
    if (loginImageSide) {
        loginImageSide.style.animation = 'slideInRight 0.6s ease forwards';
    }
    
    // Add keyframe animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Enhanced accessibility
    emailInput.setAttribute('autocomplete', 'email');
    passwordInput.setAttribute('autocomplete', 'current-password');
    
    console.log('Login page functionality initialized');
});
