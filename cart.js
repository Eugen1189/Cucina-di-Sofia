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
        description: 'Классика, доведена до досконалості. Свіжий прошутто ді Парма, ніжна моцарела фіор ді латте та хрустка рукола на артезанській чіабатті.',
        price: 150,
        image: 'images/panini-prosciutto-mozzarella.png',
        category: 'panini',
        isSpecial: true,
        ingredients: [
            { name: 'Prosciutto', nameIt: 'Prosciutto di Parma', image: 'images/ingredient-prosciutto.png', weight: '40g' },
            { name: 'Mozzarella Fresca', nameIt: 'Mozzarella Fior di Latte', image: 'images/ingredient-mozzarella.png', weight: '60g' },
            { name: 'Rucola', nameIt: 'Rucola Fresca', image: 'images/ingredient-arugula.png', weight: '15g' },
            { name: 'Pane Ciabatta', nameIt: 'Ciabatta Artigianale', image: 'images/ingredient-ciabatta.png', weight: '90g' }
        ]
    },
    {
        id: 2,
        name: 'Caprese Panini',
        description: 'Смак літньої Італії у кожному шматочку. Стиглі томати, крем-сир та свіжий базилік – просто та божественно.',
        price: 130,
        image: 'images/panini-caprese.png',
        category: 'panini'
    },
    {
        id: 3,
        name: 'Salame e Peperoni',
        description: 'Пікантна салямі з регіону Калабрія та солодкий перець гриль. Для справжніх гурманів італійської кухні.',
        price: 140,
        image: 'images/panini-salame-peperoni.png',
        category: 'panini'
    },

    // ===============================================
    //                   PIZZA
    // ===============================================
    {
        id: 201,
        name: 'Margherita di Sofia',
        description: 'Наша королева, приготована за рецептом нонни Софії. Соус із свіжих помідорів Сан-Марцано, моцарела ді буфала та листочки базиліку.',
        price: 200,
        image: 'images/pizza-margherita.png',
        category: 'pizza',
        isSpecial: true,
        ingredients: [
            { name: 'Pomodoro', nameIt: 'Pomodoro San Marzano', image: 'images/ingredient-tomato.png', weight: '80g' },
            { name: 'Mozzarella', nameIt: 'Mozzarella di Bufala', image: 'images/ingredient-mozzarella-pizza.png', weight: '100g' },
            { name: 'Basilico Fresco', nameIt: 'Basilico Fresco', image: 'images/ingredient-basil.png', weight: '5g' },
            { name: 'Olio d\'Oliva', nameIt: 'Olio Extra Vergine', image: 'images/ingredient-olive-oil.png', weight: '10ml' }
        ]
    },
    {
        id: 202,
        name: 'Diavola',
        description: 'Для поціновувачів гострих відчуттів. Пікантна вентричіна, моцарела, томатний соус та чілі пепероніно.',
        price: 220,
        image: 'images/pizza-diavola.png',
        category: 'pizza'
    },
    {
        id: 203,
        name: 'Quattro Formaggi',
        description: 'Симфонія сирів: горгонзола, фонтіна, пармеджано та моцарела. Для справжніх шанувальників сирної насолоди.',
        price: 240,
        image: 'images/pizza-quattro-formaggi.png',
        category: 'pizza'
    },

    // ===============================================
    //                   PASTA
    // ===============================================
    {
        id: 301,
        name: 'Carbonara',
        description: 'Справжня римська класика. Спагетті з гуанчале, яєчним жовтком, сиром Пекоріно Романо та свіжомеленим чорним перцем.',
        price: 180,
        image: 'images/pasta-carbonara.png',
        category: 'pasta',
        isSpecial: true,
        ingredients: [
            { name: 'Guanciale', nameIt: 'Guanciale Romano', image: 'images/ingredient-guanciale.png', weight: '50g' },
            { name: 'Pecorino Romano', nameIt: 'Pecorino Romano DOP', image: 'images/ingredient-pecorino.png', weight: '30g' },
            { name: 'Tuorlo d\'uovo', nameIt: 'Tuorlo Fresco', image: 'images/ingredient-egg.png', weight: '2 pz' },
            { name: 'Pepe Nero', nameIt: 'Pepe Nero Macinato', image: 'images/ingredient-pepper.png', weight: '2g' }
        ]
    },
    {
        id: 302,
        name: 'Bolognese della Nonna',
        description: 'Тальятелле з насиченим м\'ясним рагу за старовинним рецептом нашої бабусі. Томлене годинами з любов\'ю.',
        price: 190,
        image: 'images/pasta-bolognese.png',
        category: 'pasta'
    },
    {
        id: 303,
        name: 'Pesto Genovese',
        description: 'Аромат Лігурії у вашій тарілці. Трофі з соусом песто з свіжого базиліку, кедрових горішків та пармеджано.',
        price: 170,
        image: 'images/pasta-pesto.png',
        category: 'pasta'
    },

    // ===============================================
    //                  INSALATE
    // ===============================================
    {
        id: 401,
        name: 'Insalata Greca',
        description: 'Свіжість середземномор\'я. Хрусткі огірки, соковиті томати, фета, оливки каламата та орегано.',
        price: 120,
        image: 'images/insalata-greca.png',
        category: 'insalate',
        ingredients: [
            { name: 'Pomodori', nameIt: 'Pomodori Maturi', image: 'images/ingredient-tomato-fresh.png', weight: '80g' },
            { name: 'Cetrioli', nameIt: 'Cetrioli Croccanti', image: 'images/ingredient-cucumber.png', weight: '60g' },
            { name: 'Feta', nameIt: 'Formaggio Feta', image: 'images/ingredient-feta.png', weight: '50g' },
            { name: 'Olive Kalamata', nameIt: 'Olive di Kalamata', image: 'images/ingredient-olives.png', weight: '30g' }
        ]
    },
    {
        id: 402,
        name: 'Cesare con Pollo',
        description: 'Класичний салат "Цезар" з соковитою курячою грудкою гриль, пармеджано, крутонами та домашнім соусом.',
        price: 150,
        image: 'images/insalata-cesare.png',
        category: 'insalate',
        isSpecial: true
    },
    {
        id: 403,
        name: 'Caprese Classico',
        description: 'Простота та досконалість: стиглі томати, моцарела ді буфала, свіжий базилік та бальзамічний крем.',
        price: 130,
        image: 'images/insalata-caprese.png',
        category: 'insalate'
    },

    // ===============================================
    //                  BEVANDE
    // ===============================================
    {
        id: 101,
        name: 'Acqua Minerale',
        description: 'Чиста мінеральна вода з італійських джерел Альп. Доступна у натуральному та газованому варіантах.',
        price: 40,
        image: 'images/acqua-minerale.png',
        category: 'bevande',
        isSpecial: true,
        ingredients: [
            { name: 'Bottiglia di Vetro', nameIt: 'Bottiglia Riciclabile', image: 'images/ingredient-spring-water.png', weight: '500ml' },
            { name: 'Con Ghiaccio', nameIt: 'Ghiaccio Fresco', image: 'images/ingredient-minerals.png', weight: '-' },
            { name: 'Fetta di Limone', nameIt: 'Limone Bio', image: 'images/ingredient-natural.png', weight: '1 fetta' },
            { name: 'Acqua Frizzante', nameIt: 'Versione Gassata', image: 'images/ingredient-sparkle.png', weight: 'opz.' }
        ]
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
            image: 'images/acqua-minerale.png'
        });
    }
    
    // Check if cart has panini but no pasta
    const hasPanini = cartItems.some(item => item.category === 'panini');
    const hasPasta = cartItems.some(item => item.category === 'pasta');
    
    if (hasPanini && !hasPasta) {
        recommendations.push({
            id: 301,
            name: 'Carbonara',
            price: 180,
            image: 'images/pasta-carbonara.png'
        });
    }
    
    // Check if cart has pasta but no pizza
    if (hasPasta && !hasPizza) {
        recommendations.push({
            id: 201,
            name: 'Margherita di Sofia',
            price: 200,
            image: 'images/pizza-margherita.png'
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
