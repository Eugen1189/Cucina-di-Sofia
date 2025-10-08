// ui.js - Керування модальними вікнами

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
    // Обробник для всіх кнопок, що відкривають модальні вікна
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.dataset.modalTarget;
            openModal(modalId);
            
            // Закриваємо мобільне меню, якщо відкрито
            closeMobileMenu();
        });
    });

    // Обробник для всіх кнопок закриття
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
}

// Функція для відкриття/закриття мобільного меню
export function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    
    if (!mobileMenuButton || !mobileMenuContainer) return;
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenuButton.classList.toggle('open');
        mobileMenuContainer.classList.toggle('open');
        
        // Блокуємо скрол body коли меню відкрито
        if (mobileMenuContainer.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Закриваємо меню при кліку на посилання
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
