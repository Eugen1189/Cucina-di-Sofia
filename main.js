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

// --- MENU NAVIGATION FUNCTIONALITY ---

// Категорії меню
const menuCategories = [
    { name: 'Panini', image: 'images/category-panini.jpg' },
    { name: 'Pizza', image: 'images/category-pizza.jpg' },
    { name: 'Pasta', image: 'images/category-pasta.jpg' },
    { name: 'Insalate', image: 'images/category-insalate.jpg' },
    { name: 'Bevande', image: 'images/category-bevande.jpg' }
];

function initializeMenuGallery() {
    const menuModal = document.getElementById('full-menu-modal');
    const categoryGalleryList = document.getElementById('category-gallery-list');
    const categoryContainer = document.getElementById('category-gallery-container');
    const dishContainer = document.getElementById('dish-grid-container');
    const menuTitle = document.getElementById('menu-title');
    const backButton = document.getElementById('menu-back-btn');
    
    if (!categoryGalleryList || !dishContainer) {
        console.warn('Menu navigation elements not found');
        return;
    }
    
    // --- Функція 1: Рендерить галерею категорій ---
    function renderCategories() {
        const categoriesHTML = menuCategories.map(cat => `
            <li style="--bg-image: url('${cat.image}');" data-category="${cat.name}">
                <div class="category-content">${cat.name}</div>
            </li>
        `).join('');
        
        categoryGalleryList.innerHTML = categoriesHTML;
        
        // Додаємо hover/click для мобільних
        document.querySelectorAll('#category-gallery-list li').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('#category-gallery-list li').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }
    
    // --- Функція 2: Рендерить сітку страв для обраної категорії ---
    function renderDishes(categoryName) {
        const dishes = menu.filter(item => item.category.toLowerCase() === categoryName.toLowerCase());
        
        const dishesHTML = dishes.map(dish => `
            <div class="menu-item-card">
                <img src="${dish.image}" alt="${dish.name}" class="menu-item-image">
                <div class="menu-item-info">
                    <h3 class="menu-item-name">${dish.name}</h3>
                    <p class="menu-item-description">${dish.description}</p>
                    <div class="menu-item-footer">
                        <span class="menu-item-price">${dish.price} ₴</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        dishContainer.innerHTML = dishesHTML;
    }
    
    // --- Основна логіка ---
    
    // 1. При завантаженні сторінки одразу генеруємо категорії
    renderCategories();
    
    // 2. Обробник кліків на галерею категорій
    categoryGalleryList.addEventListener('click', (e) => {
        const categoryItem = e.target.closest('li');
        if (categoryItem && categoryItem.dataset.category) {
            const categoryName = categoryItem.dataset.category;
            
            // Рендеримо страви цієї категорії
            renderDishes(categoryName);
            
            // Показуємо екран зі стравами і ховаємо категорії
            categoryContainer.classList.add('hidden');
            dishContainer.classList.remove('hidden');
            
            // Оновлюємо заголовок і показуємо кнопку "Назад"
            menuTitle.textContent = categoryName;
            backButton.classList.remove('hidden');
        }
    });
    
    // 3. Обробник кліку на кнопку "Назад"
    backButton.addEventListener('click', () => {
        // Робимо все навпаки
        categoryContainer.classList.remove('hidden');
        dishContainer.classList.add('hidden');
        
        menuTitle.textContent = 'Il Nostro Menu';
        backButton.classList.add('hidden');
    });
    
    console.log('✅ Menu navigation initialized');
}
