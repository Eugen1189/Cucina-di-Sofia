// =======================================================
// MAIN MODULE - Punto di ingresso principale
// =======================================================

import { openModal, closeModal, initializeModals } from './ui.js';
import { initializeAnimations, initializeIntroAnimation } from './animations.js';
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
    
    // Event listener principale per i clic
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        
        // Logica per il pulsante "Scopri il menu"
        if (target.id === 'discover-menu-btn') {
            event.preventDefault();
            // Apri il modal del menu
            openModal('full-menu-modal');
        }
    });
});

// --- MOBILE MENU FUNCTIONALITY ---
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuToggle || !mobileMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    // Toggle меню
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        mobileMenuToggle.classList.toggle('open');
    });
    
    // Логіка закриття меню при кліку на посилання
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const linkId = link.id;
            
            // Закриваємо меню
            mobileMenu.classList.remove('open');
            mobileMenuToggle.classList.remove('open');
            
            // Обробляємо клік залежно від ID
            if (linkId === 'mobile-open-menu') {
                e.preventDefault();
                openModal('full-menu-modal');
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

// --- MENU NAVIGATION FUNCTIONALITY ---

// Категорії меню
const menuCategories = [
    { name: 'Panini', image: 'images/category-panini.jpg' },
    { name: 'Pizza', image: 'images/category-pizza.jpg' },
    { name: 'Pasta', image: 'images/category-pasta.jpg' },
    { name: 'Insalate', image: 'images/category-insalate.jpg' },
    { name: 'Bevande', image: 'images/category-bevande.jpg' }
];

// --- ФІНАЛЬНА ЛОГІКА ДЛЯ ДВОРІВНЕВОГО МЕНЮ З GSAP АНІМАЦІЯМИ ---
function initializeMenuGallery() {
    const menuModal = document.getElementById('full-menu-modal');

    if (!menuModal) {
        console.warn('Menu modal not found');
        return;
    }

    const categoryContainer = menuModal.querySelector('#category-gallery-container ul');
    const categoryScreen = menuModal.querySelector('#category-gallery-container');
    const dishContainer = menuModal.querySelector('#dish-grid-container');
    const menuTitle = menuModal.querySelector('#menu-title');
    const backButton = menuModal.querySelector('#menu-back-btn');

    // --- ФУНКЦІЇ РЕНДЕРИНГУ ---
    function renderCategories() {
        if (!categoryContainer) return;
        
        categoryContainer.innerHTML = menuCategories.map(cat => `
            <li data-category="${cat.name}" class="category-card" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${cat.image}');">
                <span class="category-card-title">${cat.name}</span>
            </li>
        `).join('');
    }

    function renderDishes(categoryName) {
        if (!dishContainer || !menu) return;

        const dishes = menu.filter(item => item.category.toLowerCase() === categoryName.toLowerCase());
        const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        
        const categoryHTML = `
            <section class="menu-category">
                <h2>${formattedCategoryName}</h2>
                ${dishes.map(dish => `
                    <div class="menu-dish">
                        <img src="${dish.image}" alt="${dish.name}" class="menu-dish-image">
                        
                        <div class="menu-dish-info">
                            <h3>${dish.name}</h3>
                            <p>${dish.description}</p>
                            <div class="price">
                                ${dish.price} <span>EUR</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </section>
        `;
        
        dishContainer.innerHTML = categoryHTML;
    }

    // --- НОВА, ОПТИМІЗОВАНА ЛОГІКА ПЕРЕХОДІВ ТА АНІМАЦІЙ ---
    function animateOut(element, onComplete) {
        gsap.to(element, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: onComplete
        });
    }

    function animateIn(element) {
        gsap.fromTo(element, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05 }
        );
    }

    function showDishScreen(categoryName) {
        animateOut(categoryScreen, () => {
            categoryScreen.classList.add('hidden');
            renderDishes(categoryName);
            dishContainer.classList.remove('hidden');
            menuTitle.textContent = categoryName;
            backButton.classList.remove('hidden');
            // Анімуємо появу елементів списку страв
            animateIn(dishContainer.querySelectorAll('.menu-dish'));
        });
    }

    function showCategoryScreen() {
        animateOut(dishContainer, () => {
            dishContainer.classList.add('hidden');
            categoryScreen.classList.remove('hidden');
            menuTitle.textContent = 'Il Nostro Menu';
            backButton.classList.add('hidden');
            // Анімуємо появу категорій
            animateIn(categoryScreen.querySelectorAll('.category-card'));
        });
    }

    // --- ОБРОБНИКИ ПОДІЙ ---
    
    // ГАРАНТОВАНО запускаємо рендеринг категорій при завантаженні
    renderCategories();

    // Обробник кліків на галерею категорій
    if (categoryContainer) {
        categoryContainer.addEventListener('click', (e) => {
            const categoryItem = e.target.closest('li');
            if (categoryItem) {
                const categoryName = categoryItem.dataset.category;
                showDishScreen(categoryName);
            }
        });
    }

    // Обробник кліку на кнопку "Назад"
    if (backButton) {
        backButton.addEventListener('click', () => {
            showCategoryScreen();
        });
    }

    console.log('✅ Menu navigation initialized');
}
