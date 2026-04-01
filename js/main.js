/**
 * Succession Holding LLC - Main JavaScript
 */

(function() {
    'use strict';

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            const fields = ['name', 'email', 'subject', 'message'];

            fields.forEach(function(fieldId) {
                const field = document.getElementById(fieldId);
                const errorEl = document.getElementById(fieldId + 'Error');
                const parent = field.closest('.form-group');

                field.classList.remove('error');
                parent.classList.remove('has-error');
                if (errorEl) errorEl.textContent = '';

                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    parent.classList.add('has-error');
                    if (errorEl) errorEl.textContent = 'This field is required.';
                }

                if (fieldId === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value.trim())) {
                        isValid = false;
                        field.classList.add('error');
                        parent.classList.add('has-error');
                        if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
                    }
                }
            });

            if (isValid) {
                // Show success message (in production, send to server)
                const formSuccess = document.getElementById('formSuccess');
                if (formSuccess) {
                    formSuccess.classList.add('show');
                    contactForm.reset();
                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            } else {
                // Scroll to first error
                const firstError = contactForm.querySelector('.has-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // Real-time validation on blur
        ['name', 'email', 'subject', 'message'].forEach(function(fieldId) {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', function() {
                    const errorEl = document.getElementById(fieldId + 'Error');
                    const parent = field.closest('.form-group');

                    if (field.value.trim()) {
                        field.classList.remove('error');
                        parent.classList.remove('has-error');
                        if (errorEl) errorEl.textContent = '';
                    }
                });
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Active nav link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function highlightNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(function(item) {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });

    // Animate elements on scroll (Intersection Observer)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const fadeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .resource-card, .info-block, .principle-item').forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(12px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            fadeObserver.observe(el);
        });
    }

    // Add fade-in class styles
    var style = document.createElement('style');
    style.textContent = '.fade-in { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

})();
