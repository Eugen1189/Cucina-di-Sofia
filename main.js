// =======================================================
// MAIN MODULE - Punto di ingresso principale
// =======================================================

import { addToCart, removeFromCart, updateQuantity, initializeCart } from './cart.js';
import { openModal, closeModal, initializeModals, showNotification, renderMenuItems, renderFullMenu } from './ui.js';
import { initializeSwiper, initializeAnimations, initializeIntroAnimation, initializeWaterAnimation } from './animations.js';

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
    initializeWaterAnimation();
    
    // Inizializza Swiper immediatamente
    initializeSwiper();
    
    // Додаткова гарантія видимості кнопок після завантаження
    setTimeout(() => {
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (activeSlide) {
            const buttons = activeSlide.querySelectorAll('.add-to-cart-btn');
            buttons.forEach(button => {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
                button.style.pointerEvents = 'auto';
            });
            console.log('Buttons visibility ensured for active slide:', activeSlide.id);
        }
    }, 2000); // Затримка 2 секунди для завершення всіх анімацій
    
    // Renderizza elementi del menu
    renderMenuItems('panini', 'menu-panini-container');
    renderMenuItems('pizza', 'menu-pizza-container');
    renderMenuItems('pasta', 'menu-pasta-container'); // <-- ДОДАЙТЕ ЦЕЙ РЯДОК
    // renderMenuItems('bevande', 'menu-bevande-container'); // Commentato perché ora è statico
    
    // Renderizza menu completo con filtri
    renderFullMenu();
    
    // Event listener для зміни слайдів - гарантує видимість кнопок
    document.addEventListener('swiperSlideChange', () => {
        setTimeout(() => {
            const activeSlide = document.querySelector('.swiper-slide-active');
            if (activeSlide) {
                const buttons = activeSlide.querySelectorAll('.add-to-cart-btn');
                buttons.forEach(button => {
                    button.style.opacity = '1';
                    button.style.visibility = 'visible';
                    button.style.pointerEvents = 'auto';
                });
                console.log('Buttons visibility ensured after slide change:', activeSlide.id);
            }
        }, 100);
    });
    
    // Event listener principale per i clic
    document.body.addEventListener('click', (event) => {
        const target = event.target;
        
        // Logica aggiunta al carrello
        if (target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(target.dataset.id);
            if (productId) {
                addToCart(productId);
                showNotification('Prodotto aggiunto al carrello!', 'success');
                
                // Animazione pulsante
                target.classList.add('added');
                setTimeout(() => {
                    target.classList.remove('added');
                }, 2000);
            }
        }
        
        // Logica rimozione dal carrello
        if (target.classList.contains('remove-from-cart-btn')) {
            const productId = parseInt(target.dataset.id);
            if (productId) {
                removeFromCart(productId);
                showNotification('Prodotto rimosso dal carrello!', 'warning');
            }
        }
        
        // Logica aggiornamento quantità
        if (target.classList.contains('quantity-btn')) {
            const productId = parseInt(target.dataset.id);
            const isIncrease = target.textContent === '+';
            const currentQuantity = parseInt(target.parentElement.querySelector('.cart-item-quantity').textContent);
            const newQuantity = isIncrease ? currentQuantity + 1 : currentQuantity - 1;
            
            if (productId) {
                updateQuantity(productId, newQuantity);
            }
        }
        
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
    
    // Gestione form ordine
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }
    
    // Inizializza carrello
    initializeCart();
});

// --- GESTIONE FORM ORDINE ---
function handleOrderSubmit(event) {
    event.preventDefault();
    
    const submitButton = document.getElementById('submit-button');
    const spinner = submitButton.querySelector('.spinner');
    const buttonText = submitButton.querySelector('.button-text');
    
    // Mostra spinner
    submitButton.classList.add('is-loading');
    spinner.classList.remove('hidden');
    buttonText.style.display = 'none';
    
    // Simula invio (sostituisci con la tua logica di invio)
    setTimeout(() => {
        // Nascondi spinner
        submitButton.classList.remove('is-loading');
        spinner.classList.add('hidden');
        buttonText.style.display = 'block';
        
        // Mostra messaggio di successo
        showNotification('Ordine inviato con successo!', 'success');
        
        // Chiudi modale ordine
        closeModal('order-modal');
        
        // Pulisci carrello
        import('./cart.js').then(({ clearCart }) => {
            clearCart();
        });
        
        // Reset form
        orderForm.reset();
        
    }, 2000);
}

// --- ESPORTA FUNZIONI GLOBALI ---
window.cartLogic = {
    addToCart,
    removeFromCart,
    updateQuantity,
    initializeCart,
    openMenu: () => {
        closeModal('cart-modal');
        openModal('full-menu-modal');
    }
};

// --- SUGGERIMENTO BEVANDE ---
function checkDrinkSuggestion() {
    import('./cart.js').then(({ getCartItems }) => {
        const cartItems = getCartItems();
        const hasFood = cartItems.some(item => item.category !== 'bevande');
        const hasDrinks = cartItems.some(item => item.category === 'bevande');
        
        if (hasFood && !hasDrinks) {
            const suggestion = document.createElement('div');
            suggestion.className = 'suggestion';
            suggestion.textContent = '💡 Suggerimento: Aggiungi una bevanda al tuo ordine!';
            
            const cartItemsContainer = document.getElementById('cart-items-container');
            if (cartItemsContainer) {
                cartItemsContainer.appendChild(suggestion);
            }
        }
    });
}
