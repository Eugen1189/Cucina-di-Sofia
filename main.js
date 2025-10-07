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
    
    // Gestione form prenotazione
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }
});

// --- GESTIONE FORM PRENOTAZIONE ---
function handleReservationSubmit(event) {
    event.preventDefault();
    
    const submitButton = document.getElementById('submit-reservation-btn');
    const spinner = submitButton.querySelector('.spinner');
    const buttonText = submitButton.querySelector('.button-text');
    const form = event.target;
    const successMessage = document.getElementById('reservation-success-message');
    
    // Mostra spinner
    submitButton.classList.add('is-loading');
    submitButton.disabled = true;
    spinner.classList.remove('hidden');
    buttonText.textContent = 'Invio in corso...';
    
    // Prepara dati per Netlify Forms
    const formData = new FormData(form);
    
    // Invia tramite Netlify Forms
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (response.ok) {
            // Successo
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            // Chiudi automaticamente dopo 3 secondi
            setTimeout(() => {
                closeModal('reservation-modal');
                form.classList.remove('hidden');
                successMessage.classList.add('hidden');
                form.reset();
            }, 3000);
        } else {
            throw new Error('Errore invio');
        }
    })
    .catch(error => {
        console.error('Errore:', error);
        alert('Si è verificato un errore. Per favore chiama direttamente: +39 012 345 6789');
    })
    .finally(() => {
        // Nascondi spinner
        submitButton.classList.remove('is-loading');
        submitButton.disabled = false;
        spinner.classList.add('hidden');
        buttonText.textContent = 'Invia Prenotazione';
    });
}
