// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // 3D Parallax effect for hero section
    const parallaxHero = document.getElementById('parallax-hero');
    if (parallaxHero) {
        document.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            parallaxHero.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Reset transform when mouse leaves
        parallaxHero.addEventListener('mouseleave', function() {
            parallaxHero.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
    
    // Task verification
    const instagramCheckbox = document.getElementById('instagramTask');
    const telegramCheckbox = document.getElementById('telegramTask');
    const verifyBtn = document.getElementById('verifyBtn');
    
    // Enable/disable verify button based on task completion
    function updateVerifyButton() {
        if (instagramCheckbox && telegramCheckbox && verifyBtn) {
            verifyBtn.disabled = !(instagramCheckbox.checked && telegramCheckbox.checked);
        }
    }
    
    if (instagramCheckbox && telegramCheckbox) {
        instagramCheckbox.addEventListener('change', updateVerifyButton);
        telegramCheckbox.addEventListener('change', updateVerifyButton);
    }
    
    // Verify tasks and show access
    if (verifyBtn) {
        verifyBtn.addEventListener('click', function() {
            const tasksSection = document.querySelector('.tasks-section');
            const verificationSection = document.getElementById('verificationSection');
            const congratsSection = document.getElementById('congratsSection');
            
            // Show verification in progress
            if (tasksSection) tasksSection.classList.add('hidden');
            if (verificationSection) verificationSection.classList.remove('hidden');
            
            // Simulate verification delay (2 seconds)
            setTimeout(function() {
                // Hide verification section and show congrats
                if (verificationSection) verificationSection.classList.add('hidden');
                if (congratsSection) {
                    congratsSection.classList.remove('hidden');
                    
                    // Scroll to the congrats section
                    congratsSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }, 2000);
        });
    }
    
    // Scroll to sections smoothly when clicking navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .module-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for scroll animation elements
    document.querySelectorAll('.feature-card, .module-card, .testimonial-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
});
