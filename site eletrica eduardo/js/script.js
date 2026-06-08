document.addEventListener('DOMContentLoaded', () => {
    /* ========== MANIPULAÇÃO DO MENU MOBILE ========== */
    const navMenu = document.getElementById('nav');
    const menuBtn = document.getElementById('menu-btn');
    
    // Verifica se os elementos existem
    if (navMenu && menuBtn) {
        const menuIcon = menuBtn.querySelector('i');
        
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            if (menuIcon) {
                if (navMenu.classList.contains('active')) {
                    menuIcon.classList.replace('ph-list', 'ph-x');
                } else {
                    menuIcon.classList.replace('ph-x', 'ph-list');
                }
            }
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.replace('ph-x', 'ph-list');
                }
            });
        });
    }
    
    /* ========== FUNÇÕES PARA O SLIDER ========== */
    const slides = document.querySelectorAll('.carousel-slide');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    
    if (slides.length > 0 && btnNext && btnPrev) {
        let currentSlide = 0;
        let autoPlayTimer;
        
        function showTargetSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }
            
            slides[currentSlide].classList.add('active');
        }
        
        function runAutoPlay() {
            autoPlayTimer = setInterval(() => {
                showTargetSlide(currentSlide + 1);
            }, 6000);
        }
        
        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            runAutoPlay();
        }
        
        btnNext.addEventListener('click', () => {
            showTargetSlide(currentSlide + 1);
            resetAutoPlay();
        });
        
        btnPrev.addEventListener('click', () => {
            showTargetSlide(currentSlide - 1);
            resetAutoPlay();
        });
        
        runAutoPlay();
    }
    
    /* ========== DARK MODE ========== */
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const themeIcon = themeBtn.querySelector('i');
        
        // Recuperar tema salvo anteriormente
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeIcon) themeIcon.classList.replace('ph-moon', 'ph-sun');
        }
        
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            if (isDark) {
                if (themeIcon) themeIcon.classList.replace('ph-moon', 'ph-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                if (themeIcon) themeIcon.classList.replace('ph-sun', 'ph-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    /* ========== CONTADORES (STATS) ========== */
    const counters = document.querySelectorAll('.stat-num');
    
    function runCounterAnimation(el) {
        const targetNumber = parseInt(el.getAttribute('data-target'));
        const durationLimit = 2000;
        let counterValue = 0;
        const incrementAmount = targetNumber / (durationLimit / 20);
        
        const updateVisualsTimer = setInterval(() => {
            counterValue += incrementAmount;
            if (counterValue >= targetNumber) {
                el.innerText = targetNumber;
                clearInterval(updateVisualsTimer);
            } else {
                el.innerText = Math.ceil(counterValue);
            }
        }, 20);
    }
    
    if (counters.length > 0) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounterAnimation(entry.target);
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        
        counters.forEach(counterItem => {
            scrollObserver.observe(counterItem);
        });
    }
});