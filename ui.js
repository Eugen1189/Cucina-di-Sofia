// ui.js - Gestione delle finestre modali

export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

export function initializeModals() {
    // Gestore per tutti i pulsanti che aprono finestre modali
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.dataset.modalTarget;
            openModal(modalId);
            
            // Chiudiamo il menu mobile se aperto
            closeMobileMenu();
        });
    });

    // Gestore per tutti i pulsanti di chiusura
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
}

// Funzione per aprire/chiudere il menu mobile
export function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    
    if (!mobileMenuButton || !mobileMenuContainer) return;
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenuButton.classList.toggle('open');
        mobileMenuContainer.classList.toggle('open');
        
        // Blocchiamo lo scroll del body quando il menu è aperto
        if (mobileMenuContainer.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Chiudiamo il menu al click sul link
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

function closeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    
    if (mobileMenuButton && mobileMenuContainer) {
        mobileMenuButton.classList.remove('open');
        mobileMenuContainer.classList.remove('open');
        document.body.style.overflow = '';
    }
}
