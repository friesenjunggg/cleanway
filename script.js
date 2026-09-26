document.addEventListener('DOMContentLoaded', () => {
    // --- Dark / Light Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
    }

    themeToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Mobile Navigation Menu ---
    const burgerMenuBtn = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    function toggleMenu() {
        burgerMenuBtn.classList.toggle('is-active');
        navMenu.classList.toggle('is-open');
        body.classList.toggle('no-scroll');
    }

    burgerMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    // Close mobile menu on nav link click
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

    // --- Accordion FAQ ---
    const accordionHeaders = document.querySelectorAll('.accordion__header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            e.preventDefault();
            const item = header.parentElement;
            const isOpen = item.classList.contains('is-open');

            // Close all accordion items
            document.querySelectorAll('.accordion__item').forEach(accItem => {
                accItem.classList.remove('is-open');
            });

            // Open clicked item if it wasn't open
            if (!isOpen) {
                item.classList.add('is-open');
            }
        });
    });

    // --- Smooth Scroll Fix for Anchors ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});