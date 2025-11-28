/**** PAGE HOME *****/

const PASSWORD = 'UNYON2025';

// Password protection
document.addEventListener('DOMContentLoaded', () => {
    const screen = document.querySelector('.password-screen');
    const form = document.querySelector('.password-form');
    const input = document.getElementById('password-input');
    const error = document.querySelector('.password-error');
    
    if (screen) {
        if (sessionStorage.getItem('unyon_access') === 'granted') {
            screen.style.display = 'none';
        } else {
            document.body.style.overflow = 'hidden';
            input.focus();
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const entered = input.value.trim();
                
                if (entered === PASSWORD) {
                    sessionStorage.setItem('unyon_access', 'granted');
                    screen.style.opacity = '0';
                    document.body.style.overflow = 'auto';
                    setTimeout(() => screen.style.display = 'none', 500);
                } else {
                    error.textContent = 'ACCESS DENIED';
                    input.value = '';
                    setTimeout(() => error.textContent = '', 2000);
                }
            });
        }
    }
    
    // Loader
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }, 1000);
        });
    }
    
    // Scroll indicator
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        indicator.addEventListener('click', () => {
            document.querySelector('.card-section')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Parallax header
    const logo = document.querySelector('.logo-unyon');
    const header = document.querySelector('.header-hero');
    
    if (logo || header) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (logo) logo.style.transform = `translateY(${scrolled * 0.3}px)`;
            if (header) header.style.opacity = 1 - (scrolled / 600);
        });
    }
    
    // Carousel LOOKS
    const card = document.querySelector('.card');
    if (card) {
        const images = ['images/look/look1a.jpg', 'images/look/look1b.jpg.jpg', 'images/look/look2a.jpg.jpg'];
        let currentIndex = 0;
        const img = card.querySelector('.card-image img');
        const dots = card.querySelectorAll('.carousel-dot');
        
        function changeImage() {
            img.style.opacity = '0';
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % images.length;
                img.src = images[currentIndex];
                dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
                img.style.opacity = '1';
            }, 300);
        }
        
        setInterval(changeImage, 4000);
        dots.forEach((dot, i) => dot.addEventListener('click', () => {
            img.style.opacity = '0';
            setTimeout(() => {
                currentIndex = i;
                img.src = images[i];
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                img.style.opacity = '1';
            }, 300);
        }));
    }
    
    // Carousel COLLAB
    const collabSection = document.querySelector('.collab-section');
    if (collabSection) {
        const images = collabSection.querySelectorAll('.collab-images img');
        const dots = collabSection.querySelectorAll('.nav-dot');
        let currentIndex = 0;
        
        function showImage(index) {
            images.forEach((img, i) => {
                img.style.opacity = i === index ? '1' : '0.3';
                img.style.transform = i === index ? 'scale(1.05)' : 'scale(1)';
            });
            dots.forEach((dot, i) => {
                dot.style.background = i === index ? 'var(--color-bg)' : 'transparent';
            });
        }
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 5000);
        
        dots.forEach((dot, i) => dot.addEventListener('click', () => {
            currentIndex = i;
            showImage(i);
        }));
        
        showImage(0);
    }
    
    // Cards 3D tilt
    document.querySelectorAll('.card').forEach(card => {
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
    
    // Glow effect
    document.querySelectorAll('.card, .collab-section, .brandstory-section').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
            el.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
        });
    });
    
    // Text scramble
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
            
            for (let i = 0; i < this.queue.length; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.chars[Math.floor(Math.random() * this.chars.length)];
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
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.scrambled) {
                const fx = new TextScramble(entry.target);
                const text = entry.target.innerText;
                entry.target.dataset.scrambled = 'true';
                setTimeout(() => fx.setText(text), 300);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.collab-title, .brandstory-title').forEach(el => observer.observe(el));
    
    // Footer marquee
    const logos = document.querySelector('.footer-logo');
    if (logos) {
        logos.innerHTML = logos.innerHTML + logos.innerHTML + logos.innerHTML;
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
    
    // Easter egg
    const title = document.querySelector('.title-header');
    if (title) {
        let clicks = 0;
        title.addEventListener('click', () => {
            clicks++;
            if (clicks === 5) {
                document.body.style.animation = 'rainbow 2s ease-in-out';
                setTimeout(() => {
                    document.body.style.animation = '';
                    clicks = 0;
                }, 2000);
            }
        });
    }
    
    // Scroll reveal
    initScrollReveal('.card, .collab-section, .brandstory-section, .footer-section');
});