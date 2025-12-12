function initPasswordScreen() {
    const passwordScreen = document.querySelector('.password-screen');
    const passwordForm = document.querySelector('.password-form');
    const passwordInput = document.getElementById('password-input');
    const errorMsg = document.querySelector('.password-error');
    
    const correctPassword = 'unyon2025';
    
    if (!passwordScreen || !passwordForm) return;
    
    if (sessionStorage.getItem('authenticated') === 'true') {
        passwordScreen.classList.add('hidden');
        return;
    }
    
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = passwordInput.value;
        
        if (password === correctPassword) {
            sessionStorage.setItem('authenticated', 'true');
            passwordScreen.classList.add('hidden');
            setTimeout(() => {
                passwordScreen.style.display = 'none';
            }, 500);
        } else {
            errorMsg.textContent = '';
            passwordInput.value = '';
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordInput.style.animation = '';
                errorMsg.textContent = '';
            }, 2000);
        }
    });
}

function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    // Cache le loader immédiatement si password screen est actif
    const passwordScreen = document.querySelector('.password-screen');
    if (passwordScreen && !passwordScreen.classList.contains('hidden')) {
        loader.style.display = 'none';
        return;
    }
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('newsletter-email').value;
        const successMsg = document.getElementById('newsletterSuccess');
        const btn = form.querySelector('.newsletter-btn');
        
        btn.textContent = 'SENDING...';
        btn.disabled = true;
        
        setTimeout(() => {
            successMsg.classList.add('show');
            form.reset();
            btn.textContent = 'SUBSCRIBED';
            
            setTimeout(() => {
                btn.textContent = 'NOTIFY ME';
                btn.disabled = false;
                successMsg.classList.remove('show');
            }, 3000);
        }, 1000);
    });
}

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
                setTimeout(() => {
                    el.classList.add('revealed');
                }, index * 150);
            }
        });
    };
    
    window.addEventListener('scroll', reveal);
    reveal();
}

function initScrollProgress() {
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

function initBurgerMenu() {
    const burger = document.getElementById('burgerBtn');
    const nav = document.querySelector('.main-nav');
    
    if (!burger || !nav) return;
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('mobile-active');
        
        // Ne bloquer le scroll QUE si password screen n'est pas actif
        const passwordScreen = document.querySelector('.password-screen');
        if (!passwordScreen || passwordScreen.classList.contains('hidden')) {
            document.body.style.overflow = burger.classList.contains('active') ? 'hidden' : 'auto';
        }
    });
    
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('mobile-active');
            
            // Remettre le scroll QUE si password screen n'est pas actif
            const passwordScreen = document.querySelector('.password-screen');
            if (!passwordScreen || passwordScreen.classList.contains('hidden')) {
                document.body.style.overflow = 'auto';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initPasswordScreen();
    initLoader();
    initNewsletter();
    setActiveNav();
    initScrollProgress();
    initFooterMarquee();
    initBurgerMenu();
});