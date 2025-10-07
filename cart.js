// =======================================================
// CART MODULE - Logica del carrello
// =======================================================

// --- 1. MODELLO DATI ---
export const menu = [
    // ===============================================
    //                  PANINI
    // ===============================================
    {
        id: 1,
        name: 'Prosciutto e Mozzarella',
        description: 'Класика, доведена до досконалості: ніжна прошутто ді Парма, свіжа моцарела, рукола та краплина оливкової олії на хрусткій чіабатті.',
        price: 150,
        image: 'images/panini.png',
        category: 'panini',
        isSpecial: true // Позначка "Хіт"
    },
    {
        id: 2,
        name: 'Caprese',
        description: 'Смак літньої Італії: соковиті томати, моцарела ді Буфала, свіжий базилік та соус песто власного виробництва.',
        price: 130,
        image: 'images/panini.png',
        category: 'panini'
    },
    {
        id: 3,
        name: 'Salame e Peperoni',
        description: 'Пікантна салямі з регіону Калабрія, солодкі перці на грилі та ніжний сир проволоне — справжній італійський характер.',
        price: 140,
        image: 'images/panini.png',
        category: 'panini'
    },

    // ===============================================
    //                   PIZZA
    // ===============================================
    {
        id: 201,
        name: 'Margherita di Sofia',
        description: 'Наша королева, приготована за рецептом нонни Софії: томатний соус San Marzano, моцарела фіор ді латте, свіжий базилік та оливкова олія.',
        price: 200,
        image: 'images/pizza.png',
        category: 'pizza',
        isSpecial: true // Позначка "Хіт"
    },
    {
        id: 202,
        name: 'Diavola',
        description: 'Для поціновувачів гострих відчуттів: пікантна салямі "вентричина", томатний соус та моцарела.',
        price: 220,
        image: 'images/pizza.png',
        category: 'pizza'
    },
    {
        id: 203,
        name: 'Quattro Formaggi',
        description: 'Симфонія сирів: моцарела, горгонзола, пармезан та фонтіна, що тануть на вершковій основі.',
        price: 240,
        image: 'images/pizza.png',
        category: 'pizza'
    },

    // ===============================================
    //                   PASTA
    // ===============================================
    {
        id: 301,
        name: 'Carbonara',
        description: 'Справжня римська класика: спагеті з ніжним соусом з яєчних жовтків, сиру Пекоріно Романо, гуанчале та свіжомеленого чорного перцю.',
        price: 180,
        image: 'images/pasta.png',
        category: 'pasta',
        isSpecial: true // Позначка "Хіт"
    },
    {
        id: 302,
        name: 'Bolognese della Nonna',
        description: 'Тальятелле з насиченим м\'ясним рагу, яке повільно готувалося 4 години за секретним рецептом нашої бабусі.',
        price: 190,
        image: 'images/pasta.png',
        category: 'pasta'
    },
    {
        id: 303,
        name: 'Pesto Genovese',
        description: 'Аромат Лігурії у вашій тарілці: паста трофіє з соусом песто власного виробництва, кедровими горішками та пармезаном.',
        price: 170,
        image: 'images/pasta.png',
        category: 'pasta'
    },

    // ===============================================
    //                  INSALATE
    // ===============================================
    {
        id: 401,
        name: 'Insalata Caprese',
        description: 'Поєднання свіжих томатів, моцарели ді Буфала, базиліку та оливкової олії екстра вірджин — справжній смак італійського літа.',
        price: 140,
        image: 'images/panini.png',
        category: 'insalate',
        isSpecial: true
    },
    {
        id: 402,
        name: 'Insalata Caesar',
        description: 'Хрустка латука романо, пармезан, кростіні та фірмовий соус Цезар, що готується щодня.',
        price: 150,
        image: 'images/panini.png',
        category: 'insalate'
    },
    {
        id: 403,
        name: 'Insalata Verde',
        description: 'Мікс свіжих сезонних салатів з томатами черрі, огірками та лимонно-оливковою заправкою.',
        price: 120,
        image: 'images/panini.png',
        category: 'insalate'
    },

    // ===============================================
    //                  BEVANDE
    // ===============================================
    {
        id: 101,
        name: 'Acqua Minerale',
        description: 'Чиста мінеральна вода з італійських джерел, газована або негазована.',
        price: 40,
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        category: 'bevande'
    }
];

let cartItems = [];

// --- 2. FUNZIONI DEL CARRELLO ---
export function addToCart(productId) {
    console.log(`STEP 3: La funzione addToCart ha funzionato per il prodotto ID: ${productId}`);
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        const itemToAdd = menu.find(item => item.id === productId);
        if (itemToAdd) {
            cartItems.push({ ...itemToAdd, quantity: 1 });
        }
    }
    updateCart();
}

export function removeFromCart(productId) {
    console.log(`STEP rimozione: La funzione removeFromCart ha funzionato per il prodotto ID: ${productId}`);
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCart();
}

export function updateQuantity(productId, newQuantity) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCart();
        }
    }
}

export function updateCart() {
    const cartCounter = document.getElementById('cart-counter');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if (cartCounter) {
        cartCounter.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
    }
    
    if (cartItemsContainer) {
        if (cartItems.length === 0) {
            // Empty cart state
            cartItemsContainer.innerHTML = `
                <div class="cart-empty-state">
                    <div class="empty-icon">🛒</div>
                    <h3>Il tuo carrello è vuoto</h3>
                    <p>È il momento di aggiungere qualcosa di delizioso! Esplora il nostro menu e scopri i sapori autentici della cucina italiana.</p>
                    <button class="go-to-menu-btn" onclick="window.cartLogic.openMenu()">
                        Vai al Menu
                    </button>
                </div>
            `;
        } else {
            // Cart with items
            cartItemsContainer.innerHTML = cartItems.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="window.cartLogic.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="window.cartLogic.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price-section">
                        <div class="cart-item-price">€</div>
                        <button class="remove-from-cart-btn" onclick="window.cartLogic.removeFromCart(${item.id})">×</button>
                    </div>
                </div>
            `).join('');
            
            // Add recommendations
            const recommendations = generateRecommendations(cartItems);
            if (recommendations.length > 0) {
                cartItemsContainer.innerHTML += `
                    <div class="cart-recommendations">
                        <h4>💡 Raccomandazioni</h4>
                        <p>Questi prodotti si abbinano perfettamente con il tuo ordine:</p>
                        ${recommendations.map(rec => `
                            <div class="recommendation-item" onclick="window.cartLogic.addToCart(${rec.id})">
                                <img src="${rec.image}" alt="${rec.name}">
                                <div class="recommendation-item-info">
                                    <div class="recommendation-item-name">${rec.name}</div>
                                    <div class="recommendation-item-price">€</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        }
    }
    
    if (cartTotalPrice) {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalPrice.textContent = '€';
    }
    
    // Salva il carrello nel localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
}

// Generate recommendations based on cart items
function generateRecommendations(cartItems) {
    const recommendations = [];
    
    // Check if cart has pizza but no drinks
    const hasPizza = cartItems.some(item => item.category === 'pizza');
    const hasDrinks = cartItems.some(item => item.category === 'bevande');
    
    if (hasPizza && !hasDrinks) {
        recommendations.push({
            id: 101,
            name: 'Acqua Minerale',
            price: 40,
            image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        });
    }
    
    // Check if cart has panini but no pasta
    const hasPanini = cartItems.some(item => item.category === 'panini');
    const hasPasta = cartItems.some(item => item.category === 'pasta');
    
    if (hasPanini && !hasPasta) {
        recommendations.push({
            id: 301,
            name: 'Pasta Carbonara',
            price: 180,
            image: 'images/pasta.png'
        });
    }
    
    // Check if cart has pasta but no pizza
    if (hasPasta && !hasPizza) {
        recommendations.push({
            id: 201,
            name: 'Pizza Margherita',
            price: 200,
            image: 'images/pizza.png'
        });
    }
    
    return recommendations;
}

export function initializeCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCart();
    }
}

export function getCartItems() {
    return cartItems;
}

export function clearCart() {
    cartItems = [];
    updateCart();
}
