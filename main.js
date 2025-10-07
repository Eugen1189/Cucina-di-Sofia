// =======================================================
// MAIN MODULE - Punto di ingresso principale
// =======================================================

import { openModal, closeModal, initializeModals } from './ui.js';
import { initializeSwiper, initializeAnimations, initializeIntroAnimation } from './animations.js';
import { menu } from './cart.js';

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
    initializeMenuGallery();
    
    // Inizializza Swiper immediatamente
    initializeSwiper();
    
    // Renderizza menu completo con filtri (rimosso - ora usiamo Hover Gallery)
    // renderFullMenu();
    
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

// --- MENU GALLERY FUNCTIONALITY ---
function initializeMenuGallery() {
    const galleryList = document.getElementById('menu-gallery-list');
    
    if (!galleryList) {
        console.warn('Menu gallery list not found');
        return;
    }
    
    // Фільтруємо тільки спеціальні страви (isSpecial) для галереї
    const specialItems = menu.filter(item => item.isSpecial);
    
    // Генеруємо HTML для кожної страви
    const galleryHTML = specialItems.map(item => `
        <li style="--bg-image: url('${item.image}');">
            <div class="content">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <span>${item.price}</span>
            </div>
        </li>
    `).join('');
    
    galleryList.innerHTML = galleryHTML;
    
    // Адаптація для мобільних (клік замість hover)
    document.querySelectorAll('.hover-gallery li').forEach(item => {
        item.addEventListener('click', () => {
            // Прибираємо клас 'active' з усіх, крім натиснутого
            document.querySelectorAll('.hover-gallery li').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    console.log(`✅ Menu gallery initialized with ${specialItems.length} items`);
}
