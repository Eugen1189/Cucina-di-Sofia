// main.js - Фінальна версія з повною логікою меню

import { initializeModals, initializeMobileMenu, openModal, closeModal } from './ui.js';
import { initializeIntroAnimation } from './animations.js';
import { menu } from './cart.js'; // Імпортуємо дані меню

document.addEventListener('DOMContentLoaded', () => {
    initializeModals();
    initializeMobileMenu();
    initializeIntroAnimation();
    initializeHoverGallery();
});

function initializeHoverGallery() {
    const galleryContainer = document.getElementById('hover-gallery-menu');
    const dishListContainer = document.getElementById('dish-list-container');
    
    if (!galleryContainer || !dishListContainer) {
        console.error("Не знайдено елементи для меню.");
        return;
    }

    const strips = galleryContainer.querySelectorAll('.category-strip');
    const dishListContent = document.getElementById('dish-list-content');
    const backButton = document.getElementById('menu-back-btn');

    // Функція для показу списку страв
    function showDishes(category) {
        const categoryDishes = menu.filter(item => item.category.toLowerCase() === category.toLowerCase());
        
        dishListContent.innerHTML = `
            <h2 class="dish-list-title">${category}</h2>
            ${categoryDishes.map(dish => `
                <div class="dish-item">
                    <img src="${dish.image}" alt="${dish.name}" class="dish-item-image">
                    <div class="dish-item-info">
                            <h3>${dish.name}</h3>
                            <p>${dish.description}</p>
                        <div class="price">${dish.price} EUR</div>
                        </div>
                    </div>
                `).join('')}
        `;
        dishListContainer.classList.remove('hidden');
    }

    // Функція для повернення до галереї
    function showGallery() {
        dishListContainer.classList.add('hidden');
    }

    // Обробник для кліку -> показати страви
    strips.forEach(strip => {
        strip.addEventListener('click', () => {
            const category = strip.dataset.category;
            showDishes(category);
        });
    });

    // Обробник для кнопки "Назад"
    backButton.addEventListener('click', showGallery);

    console.log('✅ Premium Hover Gallery (Static Blocks) ініціалізовано');
}
