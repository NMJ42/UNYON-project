/**** PAGE GALERIE *****/


function initPortfolio() {
    const viewer = document.querySelector('.portfolio-section');
    if (!viewer) return;
    
    const images = [
        'images/portfolio/portfolio-1.png',
        'images/portfolio/portfolio-2.png',
        'images/portfolio/portfolio-3.png',
        'images/portfolio/portfolio-4.png',
        'images/portfolio/portfolio-5.png',
        'images/portfolio/portfolio-6.png',
        'images/portfolio/portfolio-7.png',
        'images/portfolio/portfolio-8.png',
        'images/portfolio/portfolio-9.png'
    ];
    
    let currentIndex = 0;
    const img = document.getElementById('portfolioImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPage = document.getElementById('currentPage');
    const dots = document.querySelectorAll('.portfolio-dots .dot');
    
    function showPage(index) {
        img.style.opacity = '0';
        setTimeout(() => {
            currentIndex = index;
            img.src = images[index];
            currentPage.textContent = index + 1;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            img.style.opacity = '1';
        }, 300);
    }
    
    prevBtn.addEventListener('click', () => {
        showPage((currentIndex - 1 + images.length) % images.length);
    });
    
    nextBtn.addEventListener('click', () => {
        showPage((currentIndex + 1) % images.length);
    });
    
    dots.forEach((dot, i) => dot.addEventListener('click', () => showPage(i)));
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
}

// Shooting lightbox
function initLightbox() {
    const items = document.querySelectorAll('.shooting-item');
    if (!items.length) return;
    
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const current = document.getElementById('lightboxCurrent');
    
    const images = [
        'images/look/look1a.jpg',
        'images/look/look1b.jpg.jpg',
        'images/look/look1c.jpg.jpg',
        'images/look/look2a.jpg.jpg',
        'images/look/look2b.jpg.jpg',
        'images/look/look2c.jpg',
        'images/look/look3a.jpg',
        'images/look/look3b.jpg',
        'images/look/look3c.jpg.jpg',
        'images/look/pdp.jpg',
        'images/look/view.jpg'
    ];
    
    let currentIndex = 0;
    
    function open(index) {
        currentIndex = index;
        img.src = images[index];
        current.textContent = index + 1;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function close() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function change(direction) {
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % images.length;
        } else {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }
        img.src = images[currentIndex];
        current.textContent = currentIndex + 1;
    }
    
    items.forEach(item => item.addEventListener('click', () => {
        open(parseInt(item.getAttribute('data-index')));
    }));
    
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => change('prev'));
    nextBtn.addEventListener('click', () => change('next'));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') change('prev');
        if (e.key === 'ArrowRight') change('next');
    });
}

// Init galerie
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    initLightbox();
});