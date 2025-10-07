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
