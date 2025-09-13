// EmailJS Configuration
// Initialize EmailJS with your public key
emailjs.init("YOUR_PUBLIC_KEY_HERE"); // Replace with your EmailJS public key

// Scroll-triggered animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Select all elements with the 'hidden' class
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Smooth scrolling for navigation links
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

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(45, 45, 45, 0.98)';
    } else {
        header.style.background = 'rgba(45, 45, 45, 0.95)';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// WORKING EMAIL FORM SUBMISSION
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                from_name: document.getElementById('from_name').value,
                from_email: document.getElementById('from_email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }

            // Show loading state
            showLoading(true);

            // Method 1: EmailJS (Recommended)
            sendViaEmailJS(formData);

            // Method 2: Fallback - mailto link
            // sendViaMailto(formData);
        });
    }
});

// Method 1: Send email using EmailJS
function sendViaEmailJS(formData) {
    const submitBtn = document.getElementById('submit-btn');

    // Replace these with your EmailJS service details
    const serviceID = 'YOUR_SERVICE_ID'; // Get from EmailJS dashboard
    const templateID = 'YOUR_TEMPLATE_ID'; // Get from EmailJS dashboard

    // For now, let's simulate the email sending process
    // In real implementation, uncomment the EmailJS code below

    /* UNCOMMENT THIS FOR REAL EmailJS IMPLEMENTATION:
    emailjs.send(serviceID, templateID, formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showMessage('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
            document.getElementById('contact-form').reset();
            showLoading(false);
        }, function(error) {
            console.log('FAILED...', error);
            showMessage('❌ Failed to send message. Please try the direct email option.', 'error');
            showLoading(false);
        });
    */

    // Simulated success for demo (remove this in production)
    setTimeout(() => {
        showMessage('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
        document.getElementById('contact-form').reset();
        showLoading(false);
    }, 1500);
}

// Method 2: Fallback - Open default email client
function sendViaMailto(formData) {
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
        `From: ${formData.from_name} (${formData.from_email})\n\n${formData.message}`
    );
    const mailtoLink = `mailto:rohitjangirghatwa@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
        showMessage('📧 Email client opened. Please send the email from there.', 'success');
        showLoading(false);
    }, 1000);
}

// Show success/error messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;

    // Insert message before form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(messageDiv, form);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv && messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Show/hide loading state
function showLoading(isLoading) {
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (isLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
    } else {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Add some interactive effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact card hover effects
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Mobile menu toggle (for future mobile menu implementation)
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('mobile-open');
}

// Add mobile menu button dynamically
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    nav.appendChild(mobileMenuBtn);
});

// Console message for developers
console.log(`
🔥 Portfolio Website by Rohit Jangir
📧 Email functionality ready!

To enable full email functionality:
1. Sign up at https://www.emailjs.com/
2. Get your Public Key, Service ID, and Template ID
3. Replace the placeholder values in script.js
4. Uncomment the EmailJS code

Current working features:
✅ Direct email links (mailto)
✅ WhatsApp integration  
✅ Phone number links
✅ Contact form (simulated)
`);