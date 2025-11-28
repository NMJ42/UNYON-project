/**** PAGE GLOBAL *****/


function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function initScrollReveal(selector) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    
    const reveal = () => {
        const windowHeight = window.innerHeight;
        elements.forEach((el, index) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight * 0.85 && !el.classList.contains('revealed')) {
                setTimeout(() => el.classList.add('revealed'), index * 150);
            }
        });
    };
    
    window.addEventListener('scroll', reveal);
    reveal();
}

// Scroll progress bar
function initProgressBar() {
    const bar = document.createElement('div');
    bar.classList.add('scroll-progress-bar');
    document.body.appendChild(bar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = ((scrollTop / docHeight) * 100) + '%';
    });
}

function initFooterMarquee() {
    const logos = document.querySelector('.footer-logo');
    if (!logos) return;
    
    // Clone le contenu 3x pour l'effet infini
    const originalContent = logos.innerHTML;
    logos.innerHTML = originalContent + originalContent + originalContent;
    
    let position = 0;
    
    function animate() {
        position -= 0.5;
        const width = logos.scrollWidth / 3;
        if (Math.abs(position) >= width) position = 0;
        logos.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }
    animate();
}

// Init global
document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    initProgressBar();
    initFooterMarquee();
});