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
    
    if (!mobileMenuToggle) {
        console.warn('Mobile menu toggle button not found');
        return;
    }
    
    // Toggle меню
    mobileMenuToggle.addEventListener('click', () => {
        document.body.classList.toggle('mobile-menu-open');
        mobileMenuToggle.classList.toggle('open');
    });
    
    // Логіка закриття меню при кліку на посилання
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const linkId = link.id;
            
            // Закриваємо меню
            document.body.classList.remove('mobile-menu-open');
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

// --- ФІНАЛЬНА ЛОГІКА ДЛЯ ДВОРІВНЕВОГО МЕНЮ ---
function initializeMenuGallery() {
    const menuModal = document.getElementById('full-menu-modal');

    if (!menuModal) {
        console.warn('Menu modal not found');
        return;
    }

    const categoryContainer = menuModal.querySelector('#category-gallery-container ul');
    const dishContainer = menuModal.querySelector('#dish-grid-container');
    const menuTitle = menuModal.querySelector('#menu-title');
    const backButton = menuModal.querySelector('#menu-back-btn');

    // --- Функція 1: Рендерить галерею категорій ---
    function renderCategories() {
        if (!categoryContainer) return; // Додаткова перевірка
        
        // Використовуємо масив menuCategories
        categoryContainer.innerHTML = menuCategories.map(cat => `
            <li data-category="${cat.name}">
                <div class="category-content">${cat.name}</div>
            </li>
        `).join('');
    }

    // --- Функція 2: Рендерить сітку страв ---
    function renderDishes(categoryName) {
        if (!dishContainer || !menu) return;

        const dishes = menu.filter(item => item.category.toLowerCase() === categoryName.toLowerCase());
        
        dishContainer.innerHTML = dishes.map(dish => `
            <div class="menu-item-card" data-dish-id="${dish.id}">
                <img src="${dish.image}" alt="${dish.name}" class="menu-item-image">
                <div class="menu-item-name">${dish.name}</div>
                <div class="menu-item-description">${dish.description}</div>
                <div class="menu-item-footer">
                    <span class="menu-item-price">${dish.price} ₴</span>
                </div>
            </div>
        `).join('');
    }

    // --- Функція для перемикання екранів меню ---
    function showDishScreen(categoryName) {
        renderDishes(categoryName);
        menuModal.querySelector('#category-gallery-container').classList.add('hidden');
        dishContainer.classList.remove('hidden');
        menuTitle.textContent = categoryName;
        backButton.classList.remove('hidden');
    }

    function showCategoryScreen() {
        menuModal.querySelector('#category-gallery-container').classList.remove('hidden');
        dishContainer.classList.add('hidden');
        menuTitle.textContent = 'Il Nostro Menu';
        backButton.classList.add('hidden');
    }

    // --- Основні обробники подій ---

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
