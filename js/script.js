/******** unyon  ********/

/****** gestion mot de passe  *******/

const PASSWORD = 'UNYON2025';

document.addEventListener('DOMContentLoaded', () => {
    const passwordScreen = document.querySelector('.password-screen');
    const passwordForm = document.querySelector('.password-form');
    const passwordInput = document.getElementById('password-input');
    const passwordError = document.querySelector('.password-error');
    
    // Vérifie si déjà authentifié
    if (sessionStorage.getItem('unyon_access') === 'granted') {
        passwordScreen.style.display = 'none';
        return;
    }
    
    // Bloque le scroll
    document.body.style.overflow = 'hidden';
    
    // Focus sur l'input
    passwordInput.focus();
    
    // Soumission du formulaire
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const entered = passwordInput.value.trim();
        
        if (entered === PASSWORD) {
            // Correct
            sessionStorage.setItem('unyon_access', 'granted');
            passwordScreen.style.transition = 'opacity 0.5s';
            passwordScreen.style.opacity = '0';
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                passwordScreen.style.display = 'none';
            }, 500);
            
        } else {
            // Incorrect
            passwordError.textContent = 'ACCESS DENIED';
            passwordInput.value = '';
            
            setTimeout(() => {
                passwordError.textContent = '';
            }, 2000);
        }
    });
});

/******** init et load   ********/

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1000);
    }
});

/******** nav  ********/

// Active state sur la page actuelle
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    }
});

// Smooth scroll vers sections
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('.card-section').scrollIntoView({ behavior: 'smooth' });
    });
}


/******** scroll effect  ********/

// Scroll reveal animations
const revealElements = document.querySelectorAll('.card, .collab-section, .brandstory-section, .footer-section');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach((el, index) => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = windowHeight * 0.85;
        
        if (elementTop < revealPoint) {
            setTimeout(() => el.classList.add('revealed'), index * 150);
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Parallax effect header
const header = document.querySelector('.header-hero');
const logo = document.querySelector('.logo-unyon');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (logo) {
        logo.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (header) {
        header.style.opacity = 1 - (scrolled / 600);
    }
});

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.classList.add('scroll-progress-bar');
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});


/******** carousel  ********/

// Carousel LOOKS GALERIE
const carouselCard = document.querySelector('.card');
if (carouselCard) {
    const images = [
        'images/look/look1a.jpg',
        'images/look/look1b.jpg.jpg',
        'images/look/look2a.jpg.jpg'
    ];
    
    let currentIndex = 0;
    const cardImage = carouselCard.querySelector('.card-image img');
    const dots = carouselCard.querySelectorAll('.carousel-dot');
    
    function changeImage() {
        cardImage.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            cardImage.src = images[currentIndex];
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            cardImage.style.opacity = '1';
        }, 300);
    }
    
    setInterval(changeImage, 4000);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            cardImage.style.opacity = '0';
            setTimeout(() => {
                currentIndex = index;
                cardImage.src = images[currentIndex];
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                cardImage.style.opacity = '1';
            }, 300);
        });
    });
}

// Carousel COLLAB
const collabSection = document.querySelector('.collab-section');
if (collabSection) {
    const collabImages = collabSection.querySelectorAll('.collab-images img');
    const navDots = collabSection.querySelectorAll('.nav-dot');
    let currentCollabIndex = 0;
    
    function showCollabImage(index) {
        collabImages.forEach((img, i) => {
            img.style.opacity = i === index ? '1' : '0.3';
            img.style.transform = i === index ? 'scale(1.05)' : 'scale(1)';
        });
        
        navDots.forEach((dot, i) => {
            dot.style.background = i === index ? 'var(--color-bg)' : 'transparent';
        });
    }
    
    setInterval(() => {
        currentCollabIndex = (currentCollabIndex + 1) % collabImages.length;
        showCollabImage(currentCollabIndex);
    }, 5000);
    
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentCollabIndex = index;
            showCollabImage(index);
        });
    });
    
    showCollabImage(0);
}


/******** anim interactive  ********/

// Cards Tilt 3D
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Glow effect qui suit la souris
const glowCards = document.querySelectorAll('.card, .collab-section, .brandstory-section');

glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});


/******** effet du texte  ********/ 

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

const scrambleElements = document.querySelectorAll('.collab-title, .brandstory-title');
const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.scrambled) {
            const fx = new TextScramble(entry.target);
            const originalText = entry.target.innerText;
            entry.target.dataset.scrambled = 'true';
            
            setTimeout(() => fx.setText(originalText), 300);
        }
    });
}, { threshold: 0.5 });

scrambleElements.forEach(el => scrambleObserver.observe(el));

/******** footer effet  ********/

// Infinite marquee (logos qui défilent)
const footerLogos = document.querySelector('.footer-logo');

if (footerLogos) {
    const logosContent = footerLogos.innerHTML;
    footerLogos.innerHTML = logosContent + logosContent + logosContent;
    
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    
    function animateMarquee() {
        scrollPosition -= scrollSpeed;
        
        const logoWidth = footerLogos.scrollWidth / 3;
        
        if (Math.abs(scrollPosition) >= logoWidth) {
            scrollPosition = 0;
        }
        
        footerLogos.style.transform = `translateX(${scrollPosition}px)`;
        requestAnimationFrame(animateMarquee);
    }
    
    animateMarquee();
}


/******** secret  ********/

// Click 5x sur le titre
let logoClickCount = 0;
const titleHeader = document.querySelector('.title-header');

if (titleHeader) {
    titleHeader.addEventListener('click', () => {
        logoClickCount++;
        
        if (logoClickCount === 5) {
            document.body.style.animation = 'rainbow 2s ease-in-out';
            
            setTimeout(() => {
                document.body.style.animation = '';
                logoClickCount = 0;
            }, 2000);
        }
    });
}


console.log('UNYON JS chargé avec succès !');