// =======================================================
// UI MODULE - Gestione modali e interfaccia utente
// =======================================================

// --- MODALI ---
export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

export function initializeModals() {
    // Event listeners per chiusura modali
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('close-button')) {
            const modal = event.target.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }
        
        if (event.target.classList.contains('modal-overlay')) {
            const modal = event.target.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Event listener per apertura carrello
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => openModal('cart-modal'));
    }
    
    // Event listener per apertura menu
    const menuLink = document.getElementById('open-menu-link');
    if (menuLink) {
        menuLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('full-menu-modal');
        });
    }
    
    // Event listener per apertura storia
    const philosophyLink = document.getElementById('open-philosophy-link');
    if (philosophyLink) {
        philosophyLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('story-modal');
        });
    }
    
    // Event listener per contatti (placeholder)
    const contactsLink = document.getElementById('open-contacts-link');
    if (contactsLink) {
        contactsLink.addEventListener('click', (e) => {
            e.preventDefault();
            // TODO: Implementare modal contatti
            console.log('Contatti clicked - da implementare');
        });
    }
    
    // Event listener per checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            closeModal('cart-modal');
            openModal('order-modal');
        });
    }
    
    // Event listener per continue shopping
    const continueShoppingBtn = document.getElementById('continue-shopping-btn');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            closeModal('cart-modal');
        });
    }
}

// --- NOTIFICHE ---
export function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-text">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Mostra notifica
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Event listener per chiusura
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-rimozione dopo 5 secondi
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// --- RENDERIZZAZIONE MENU ---
export async function renderMenuItems(category, containerId) {
    const { menu } = await import('./cart.js');
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Contenitore non trovato: ${containerId}`);
        return;
    }
    
    const categoryItems = menu.filter(item => item.category === category);
    container.innerHTML = categoryItems.map(item => `
        <div class="menu-item-card ${item.isSpecial ? 'special' : ''}">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-info">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-description">${item.description}</div>
                <div class="menu-item-footer">
                    <span class="menu-item-price">€</span>
                    <button class="menu-item-add-btn add-to-cart-btn" data-id="${item.id}">
                        Aggiungi
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// New function to render full menu with filters
export async function renderFullMenu() {
    const { menu } = await import('./cart.js');
    const container = document.getElementById('full-menu-container');
    if (!container) return;

    // Get unique categories
    const categories = [...new Set(menu.map(item => item.category))];
    
    // Create menu HTML with filters
    container.innerHTML = `
        <div class="menu-header">
            <h2>🍝 Il Nostro Menu</h2>
            <p>Scopri i sapori autentici della cucina italiana</p>
        </div>
        
        <div class="category-filters">
            <button class="category-btn active" data-category="all">Tutti</button>
            ${categories.map(cat => `
                <button class="category-btn" data-category="${cat}">
                    ${cat === 'panini' ? '🥪 Panini' : 
                      cat === 'pizza' ? '🍕 Pizza' : 
                      cat === 'pasta' ? '🍝 Pasta' : 
                      cat === 'bevande' ? '🥤 Bevande' : cat}
                </button>
            `).join('')}
        </div>
        
        <div class="menu-items-grid" id="menu-items-grid">
            ${menu.map(item => `
                <div class="menu-item-card ${item.isSpecial ? 'special' : ''}" data-category="${item.category}">
                    <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                    <div class="menu-item-info">
                        <div class="menu-item-name">${item.name}</div>
                        <div class="menu-item-description">${item.description}</div>
                        <div class="menu-item-footer">
                            <span class="menu-item-price">€</span>
                            <button class="menu-item-add-btn add-to-cart-btn" data-id="${item.id}">
                                Aggiungi
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Add event listeners for category filters
    const filterButtons = container.querySelectorAll('.category-btn');
    const menuItems = container.querySelectorAll('.menu-item-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            const selectedCategory = button.dataset.category;
            
            menuItems.forEach(item => {
                if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.3s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}
