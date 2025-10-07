// =======================================================
// MAIN MODULE - Punto di ingresso principale
// =======================================================

import { openModal, closeModal, initializeModals, renderMenuItems, renderFullMenu } from './ui.js';
import { initializeSwiper, initializeAnimations, initializeIntroAnimation } from './animations.js';

// --- INIZIALIZZAZIONE PRINCIPALE ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("PASSO 1: Pagina caricata. Avviamo lo script.");
    
    // Verifica che tutti gli elementi esistano
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.querySelector('main');
    const swiperContainer = document.querySelector('.swiper');
    
    console.log("Elementi trovati:", {
        introScreen: !!introScreen,
        mainContent: !!mainContent,
        swiperContainer: !!swiperContainer
    });
    
    // Inizializza moduli
    initializeModals();
    initializeAnimations();
    initializeIntroAnimation();
    initializeMobileMenu();
    initializeMenuBook();
    
    // Inizializza Swiper immediatamente
    initializeSwiper();
    
    // Renderizza elementi del menu
    renderMenuItems('panini', 'menu-panini-container');
    renderMenuItems('pizza', 'menu-pizza-container');
    renderMenuItems('pasta', 'menu-pasta-container');
    renderMenuItems('insalate', 'menu-insalate-container');
    renderMenuItems('bevande', 'menu-bevande-container');
    
    // Renderizza menu completo con filtri
    renderFullMenu();
    
    // Event listener principale per i clic
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        
        // Logica per il pulsante "Scopri il menu"
        if (target.id === 'discover-menu-btn') {
            event.preventDefault();
            // Vai al secondo slide (Panini)
            const swiper = document.querySelector('.swiper').swiper;
            if (swiper) {
                swiper.slideTo(1, 1000); // Slide to index 1 (Panini slide)
            }
        }
    });
});

// --- MOBILE MENU FUNCTIONALITY ---
function initializeMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    
    if (!menuToggle || !mobileMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    // Функція відкриття/закриття меню
    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        mobileMenu.classList.add('open');
        menuToggle.classList.add('open');
        document.body.style.overflow = 'hidden'; // Блокуємо прокрутку фону
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        document.body.style.overflow = ''; // Відновлюємо прокрутку
    }
    
    // Event listener для бургер-кнопки
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Event listeners для посилань в меню
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const linkId = link.id;
            
            // Закриваємо мобільне меню
            closeMobileMenu();
            
            // Обробляємо клік залежно від ID
            if (linkId === 'mobile-open-menu') {
                e.preventDefault();
                openModal('menu-modal');
            } else if (linkId === 'mobile-open-story') {
                e.preventDefault();
                openModal('story-modal');
            } else if (linkId === 'mobile-open-contacts') {
                e.preventDefault();
                openModal('contacts-modal');
            }
        });
    });
    
    console.log('✅ Mobile menu initialized');
}

// --- MENU BOOK FUNCTIONALITY ---
function initializeMenuBook() {
    const prevBtn = document.getElementById('prev-page-btn');
    const nextBtn = document.getElementById('next-page-btn');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    const bookPages = document.querySelectorAll('.book-page');
    
    if (!prevBtn || !nextBtn || bookPages.length === 0) {
        console.warn('Menu book elements not found');
        return;
    }
    
    let currentPage = 0;
    const totalPages = bookPages.length;
    
    totalPagesSpan.textContent = totalPages;
    
    function updatePage() {
        // Прибираємо активний клас з усіх сторінок
        bookPages.forEach((page, index) => {
            page.classList.remove('active', 'prev');
            
            if (index === currentPage) {
                page.classList.add('active');
            } else if (index < currentPage) {
                page.classList.add('prev');
            }
        });
        
        // Оновлюємо індикатор
        currentPageSpan.textContent = currentPage + 1;
        
        // Керуємо кнопками
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }
    
    function nextPage() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updatePage();
        }
    }
    
    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            updatePage();
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const menuModal = document.getElementById('full-menu-modal');
        if (menuModal && !menuModal.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                prevPage();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                nextPage();
            }
        }
    });
    
    // Ініціалізуємо першу сторінку
    updatePage();
    
    console.log('✅ Menu book initialized');
}
