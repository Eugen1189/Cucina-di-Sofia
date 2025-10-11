// main.js - Versione finale con logica completa del menu

import { initializeModals, initializeMobileMenu, openModal, closeModal } from './ui.js';
import { initializeIntroAnimation } from './animations.js';
import { menu } from './cart.js'; // Importiamo i dati del menu

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
        console.error("Elementi del menu non trovati.");
        return;
    }

    const strips = galleryContainer.querySelectorAll('.category-strip');
    const dishListContent = document.getElementById('dish-list-content');
    const backButton = document.getElementById('menu-back-btn');

    // Funzione per mostrare la lista dei piatti
    function showDishes(category) {
        const categoryDishes = menu.filter(item => item.category.toLowerCase() === category.toLowerCase());
        const dishListTitle = document.getElementById('dish-list-title'); // ✨ NEW

        // ✨ NEW: Вставляємо заголовок в новий елемент
        if (dishListTitle) {
            dishListTitle.textContent = category;
        }
        
        dishListContent.innerHTML = categoryDishes.map(dish => `
            <div class="dish-item">
                <div class="dish-item-image-wrapper">
                    <img src="${dish.image}" alt="${dish.name}" class="dish-item-image">
                </div>
                <div class="dish-item-info">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                    <div class="price">${dish.price} EUR</div>
                </div>
            </div>
        `).join('');
        dishListContainer.classList.remove('hidden');
    }

    // Funzione per tornare alla galleria
    function showGallery() {
        dishListContainer.classList.add('hidden');
    }

    // Gestore per il click -> mostrare i piatti
    strips.forEach(strip => {
        strip.addEventListener('click', () => {
            const category = strip.dataset.category;
            showDishes(category);
        });
    });

    // Gestore per il pulsante "Indietro"
    backButton.addEventListener('click', showGallery);

    console.log('✅ Premium Hover Gallery (Blocchi Statici) inizializzata');
}
