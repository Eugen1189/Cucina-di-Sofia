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
