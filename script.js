// =================================================================
// ✨ VERSIONE FINALE, SEMPLIFICATA E STABILE DI SCRIPT.JS ✨
// =================================================================

// =======================================================
// ALTERNATIVO: CODICE PER HEADER TRASPARENTE CON CLASSI CSS
// =======================================================
// Se vuoi implementare il cambio colore header direttamente qui,
// puoi aggiungere questo codice nella sezione Swiper:

/*
const mainHeader = document.querySelector('.main-header');

const swiper = new Swiper('.swiper', {
  // ... tue configurazioni ...
  on: {
    init: function (swiper) {
      // Controlla il colore del primo slide
      const activeSlide = swiper.slides[swiper.activeIndex];
      if (activeSlide.classList.contains('text-dark-theme')) {
        mainHeader.classList.add('text-dark');
      } else {
        mainHeader.classList.remove('text-dark');
      }
    },
    slideChange: function (swiper) {
      // Controlla il colore dello slide attivo ad ogni cambio
      const activeSlide = swiper.slides[swiper.activeIndex];
      if (activeSlide.classList.contains('text-dark-theme')) {
        mainHeader.classList.add('text-dark');
      } else {
        mainHeader.classList.remove('text-dark');
      }
    }
  }
});
*/

// =======================================================
// BLOCCO UNICO DELLA LOGICA DEL CARRELLO (VERSIONE 3.0)
// =======================================================

// --- 1. MODELLO DATI ---
const menu = [
  // PANINI
  { 
    id: 1, 
    name: 'Prosciutto e Mozzarella', 
    description: 'Il classico portato alla perfezione. Prosciutto di Parma fresco, delicata mozzarella fior di latte e rucola croccante su ciabatta artigianale.', 
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
  { id: 2, name: 'Caprese Panini', description: 'Il sapore dell\'estate italiana in ogni morso. Pomodori maturi, formaggio cremoso e basilico fresco – semplice e divino.', price: 130, image: 'images/panini-caprese.png', category: 'panini' },
  { id: 3, name: 'Salame e Peperoni', description: 'Salame piccante dalla Calabria e peperoni dolci grigliati. Per i veri intenditori della cucina italiana.', price: 140, image: 'images/panini-salame-peperoni.png', category: 'panini' },
  
  // PIZZA
  { 
    id: 201, 
    name: 'Margherita di Sofia', 
    description: 'La nostra regina, preparata secondo la ricetta della nonna Sofia. Salsa di pomodori San Marzano freschi, mozzarella di bufala e foglie di basilico.', 
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
  { id: 202, name: 'Diavola', description: 'Per gli amanti del piccante. Ventricina speziata, mozzarella, salsa di pomodoro e peperoncino calabrese.', price: 220, image: 'images/pizza-diavola.png', category: 'pizza' },
  { id: 203, name: 'Quattro Formaggi', description: 'Sinfonia di formaggi: gorgonzola, fontina, parmigiano e mozzarella. Per i veri amanti del piacere caseario.', price: 240, image: 'images/pizza-quattro-formaggi.png', category: 'pizza' },
  
  // PASTA
  { 
    id: 301, 
    name: 'Carbonara', 
    description: 'L\'autentico classico romano. Spaghetti con guanciale, tuorlo d\'uovo, Pecorino Romano e pepe nero appena macinato.', 
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
  { id: 302, name: 'Bolognese della Nonna', description: 'Tagliatelle con ricco ragù di carne secondo l\'antica ricetta della nonna. Cotto lentamente per ore con amore.', price: 190, image: 'images/pasta-bolognese.png', category: 'pasta' },
  { id: 303, name: 'Pesto Genovese', description: 'Il profumo della Liguria nel vostro piatto. Trofie con pesto intenso di basilico fresco, pinoli e Parmigiano.', price: 170, image: 'images/pasta-pesto.png', category: 'pasta' },
  
  // INSALATE
  { 
    id: 402, 
    name: 'Cesare con Pollo', 
    description: 'Il classico Caesar con petto di pollo grigliato succoso, Parmigiano, crostini e salsa fatta in casa.', 
    price: 150, 
    image: 'images/insalata-cesare.png', 
    category: 'insalate',
    isSpecial: true,
    ingredients: [
      { name: 'Pollo Grigliato', nameIt: 'Petto di Pollo Grigliato', image: 'images/ingredient-chicken.png', weight: '100g' },
      { name: 'Parmigiano', nameIt: 'Parmigiano Reggiano DOP', image: 'images/ingredient-parmesan.png', weight: '30g' },
      { name: 'Crostini', nameIt: 'Crostini Croccanti', image: 'images/ingredient-croutons.png', weight: '40g' },
      { name: 'Lattuga Romana', nameIt: 'Lattuga Romana Fresca', image: 'images/ingredient-lettuce.png', weight: '80g' }
    ]
  },
  { id: 401, name: 'Insalata Greca', description: 'La freschezza del Mediterraneo. Cetrioli croccanti, pomodori succosi, feta, olive di Kalamata e origano.', price: 120, image: 'images/insalata-greca.png', category: 'insalate' },
  { id: 403, name: 'Caprese Classico', description: 'Semplicità e perfezione: pomodori maturi, mozzarella di bufala, basilico fresco e crema balsamica.', price: 130, image: 'images/insalata-caprese.png', category: 'insalate' },
  
  // BEVANDE
  {
    id: 101,
    name: 'Acqua Minerale',
    description: 'Acqua minerale pura dalle sorgenti alpine italiane. Disponibile naturale e frizzante.', 
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

// --- ФУНКЦІЯ ГЕНЕРАЦІЇ ІНГРЕДІЄНТІВ ---
function generateIngredientMap(dish) {
    if (!dish.ingredients || dish.ingredients.length === 0) {
        return ''; // Повертаємо пустий рядок, якщо інгредієнтів немає
    }

    const ingredientNodesHTML = dish.ingredients.map((ing, index) => `
        <div class="ingredient-node node-${index + 1}">
            <img src="${ing.image}" alt="${ing.nameIt}">
            <div class="ingredient-info">
                <span class="ingredient-name">${ing.nameIt}</span>
                <span class="ingredient-weight">${ing.weight}</span>
            </div>
        </div>
    `).join('');

    return ingredientNodesHTML;
}

// --- ФУНКЦІЯ ІНІЦІАЛІЗАЦІЇ ІНГРЕДІЄНТІВ ---
function initializeIngredients() {
    // Знаходимо всі слайди зі стравами (які мають data-dish-id)
    const swiperSlides = document.querySelectorAll('.swiper-slide[data-dish-id]');
    
    console.log(`🔍 Знайдено ${swiperSlides.length} слайдів зі стравами`);
    
    swiperSlides.forEach(slide => {
        const dishContainer = slide.querySelector('.dish-container');
        if (dishContainer) {
            // Отримуємо ID страви з атрибута data-dish-id
            const dishId = parseInt(slide.dataset.dishId);
            
            // Знаходимо страву в меню
            const dish = menu.find(item => item.id === dishId);
            
            if (dish && dish.ingredients) {
                // Генеруємо і вставляємо карту інгредієнтів
                const ingredientMap = dishContainer.querySelector('.ingredient-map');
                if (ingredientMap) {
                    ingredientMap.innerHTML = generateIngredientMap(dish);
                    console.log(`✅ Інгредієнти додані для "${dish.name}" (ID: ${dishId})`);
                }
            } else if (!dish) {
                console.warn(`⚠️ Страву з ID ${dishId} не знайдено в меню`);
            }
        }
    });
    
    console.log('🎉 Всі інгредієнти ініціалізовані!');
}

// Sezioni prodotti rimosse - tutti i pulsanti del carrello si trovano negli slide Swiper

function addToCart(productId) {
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

function removeFromCart(productId) {
    console.log(`STEP rimozione: La funzione removeFromCart ha funzionato per il prodotto ID: ${productId}`);
    // Creiamo un nuovo array che non include il prodotto con l'ID specificato
    cartItems = cartItems.filter(item => item.id !== productId);
    
    // Aggiorniamo la vista del carrello
    updateCart();
}

function increaseQuantity(productId) {
    console.log(`STEP incremento: La funzione increaseQuantity ha funzionato per il prodotto ID: ${productId}`);
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
        updateCart();
    }
}

function decreaseQuantity(productId) {
    console.log(`STEP decremento: La funzione decreaseQuantity ha funzionato per il prodotto ID: ${productId}`);
    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity--;
        } else {
            // Se la quantità = 1, rimuoviamo il prodotto dal carrello
            cartItems = cartItems.filter(item => item.id !== productId);
        }
        updateCart();
    }
}

function openCheckoutModal(cartData, totalAmount) {
    const orderModal = document.getElementById('order-modal');
    const orderForm = document.getElementById('order-form');
    const successMessage = document.getElementById('form-success-message');
    const hiddenProductNameInput = document.getElementById('product-name');
    
    if (orderModal && orderForm) {
        // Creiamo una stringa con i prodotti per l'invio
        const productsList = cartData.map(item => 
            `${item.name} x${item.quantity} - ${item.total} EUR`
        ).join('\n');
        
        // Impostiamo i dati nel form
        hiddenProductNameInput.value = `Ordine dal carrello:\n${productsList}\nTotale: ${totalAmount} EUR`;
        
        // Mostriamo il form e nascondiamo il messaggio di successo
        orderForm.classList.remove('hidden');
        successMessage.classList.add('hidden');
        
        // Reset del form
        orderForm.reset();
        hiddenProductNameInput.value = `Ordine dal carrello:\n${productsList}\nTotale: ${totalAmount} EUR`;
        
        // Apriamo la finestra modale
        orderModal.classList.remove('hidden');
        
        // Puliamo il carrello dopo aver aperto il form dell'ordine
        cartItems = [];
        updateCart();
    }
}

function checkDrinkSuggestion() {
    const suggestionElement = document.getElementById('drink-suggestion');
    if (!suggestionElement) return; // Se l'elemento non esiste, non facciamo nulla

    // Controlliamo se c'è almeno un prodotto nel carrello che NON è una bevanda
    const hasFood = cartItems.some(item => item.category !== 'bevande');
    
    // Controlliamo se c'è almeno una bevanda nel carrello
    const hasDrinks = cartItems.some(item => item.category === 'bevande');

    // Se c'è cibo ma non ci sono bevande, mostriamo il messaggio
    if (hasFood && !hasDrinks) {
        suggestionElement.textContent = 'Non vorresti aggiungere una bevanda al tuo ordine?';
        suggestionElement.classList.remove('hidden');
    } else {
        // In tutti gli altri casi nascondiamo il messaggio
        suggestionElement.classList.add('hidden');
    }
}

// Funzione addDrinkToCart rimossa, poiché la nuova versione usa solo il testo

function updateCart() {
    console.log('Aggiorniamo la vista del carrello. Contenuto attuale:', cartItems);
    const cartContainer = document.getElementById('cart-items-container');
    const cartCounter = document.getElementById('cart-counter');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if (!cartContainer || !cartCounter || !cartTotalPrice) {
        console.error("ERRORE: Non trovato uno degli elementi HTML del carrello!");
        return;
    }
    
    // 1. Puliamo il contenitore prima dell'aggiornamento
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Il tuo carrello è vuoto.</p>';
    } else {
        // 2. Generiamo HTML per ogni prodotto nel carrello con nuova struttura
        cartItems.forEach(item => {
            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        <div class="cart-item-controls">
                            <button class="quantity-btn decrease-quantity-btn" data-id="${item.id}">-</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="quantity-btn increase-quantity-btn" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    
                    <div class="cart-item-price-section">
                        <span class="cart-item-price">${item.price * item.quantity} EUR</span>
                    <button class="remove-from-cart-btn" data-id="${item.id}">❌</button> 
                    </div>
                </div>
            `;
            cartContainer.innerHTML += cartItemHTML;
        });
    }

    // 3. Calcoliamo la quantità totale e la somma
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 4. Aggiorniamo il contatore e la somma
    cartCounter.textContent = totalQuantity;
    cartTotalPrice.textContent = `${totalPrice} EUR`;

    // 5. Logica suggerimento bevande
    checkDrinkSuggestion();

    // 6. Salviamo il carrello nel localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
}

// --- FUNZIONE PER RENDERIZZARE GLI ELEMENTI DEL MENU ---
function renderMenuItems(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Contenitore non trovato: ${containerId}`);
        return;
    }

    // Filtriamo i prodotti per categoria
    const categoryItems = menu.filter(item => item.category === category);
    
    if (categoryItems.length === 0) {
        container.innerHTML = '<p>Nessun prodotto disponibile in questa categoria.</p>';
        return;
    }

    // Generiamo HTML per ogni prodotto
    container.innerHTML = categoryItems.map(item => `
        <div class="menu-item-card">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-name">${item.name}</div>
            <div class="menu-item-description">${item.description}</div>
            <div class="menu-item-price">${item.price} EUR</div>
            <button class="menu-item-add-btn add-to-cart-btn" data-id="${item.id}">
                Aggiungi al carrello
            </button>
        </div>
    `).join('');
}

// --- 3. AVVIO DOPO IL CARICAMENTO DELLA PAGINA ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("PASSO 1: Pagina caricata. Avviamo lo script.");

    // Sezioni prodotti rimosse - i prodotti sono disponibili solo attraverso gli slide Swiper

    // Carichiamo il carrello
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCart();
    }
    
    // Ascoltatore principale dei clic
    document.body.addEventListener('click', (event) => {
        const target = event.target;

        // --- LOGICA AGGIUNTA AL CARRELLO (AGGIORNATA) ---
        if (target.classList.contains('add-to-cart-btn')) {
            if (target.classList.contains('added')) return;

            const productId = parseInt(target.dataset.id);
            addToCart(productId);

            // Troviamo TUTTI i pulsanti per questo prodotto (originale e cloni)
            const allButtonsForProduct = document.querySelectorAll(`.add-to-cart-btn[data-id="${productId}"]`);
            
            allButtonsForProduct.forEach(button => {
                const originalText = button.textContent;
                button.textContent = 'Aggiunto ✓';
                button.classList.add('added');

                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('added');
                }, 1500);
            });
        }
        
        // --- LOGICA GESTIONE CARRELLO (senza modifiche) ---
        if (target.classList.contains('remove-from-cart-btn')) {
            const productId = parseInt(target.dataset.id);
            removeFromCart(productId);
        }
        if (target.classList.contains('increase-quantity-btn')) {
            const productId = parseInt(target.dataset.id);
            increaseQuantity(productId);
        }
        if (target.classList.contains('decrease-quantity-btn')) {
            const productId = parseInt(target.dataset.id);
            decreaseQuantity(productId);
        }
    });
    
    // Logica finestra modale carrello (controllare ID!)
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCartBtn = document.getElementById('close-cart-btn');

    if (cartIcon && cartModal && closeCartBtn) {
        cartIcon.addEventListener('click', () => {
            // Aggiorniamo il carrello usando la funzione updateCart corretta
            updateCart();
            cartModal.classList.remove('hidden');
        });
        closeCartBtn.addEventListener('click', () => cartModal.classList.add('hidden'));
    }
    
    // Gestore per il pulsante "Completa ordine"
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cartItems.length === 0) {
                // Se il carrello è vuoto
                const cartTotal = document.getElementById('cart-total-price');
                cartTotal.textContent = "Aggiungi prima i prodotti!";
                cartTotal.style.color = 'red';

                setTimeout(() => {
                    // Ripristiniamo il testo e il colore dopo 2 secondi
                    updateCart(); // Questa funzione aggiornerà la somma a "0 EUR"
                    cartTotal.style.color = ''; // Ripristiniamo il colore originale
                }, 2000);
                
            } else {
                // Se ci sono prodotti nel carrello - apriamo il form dell'ordine
                // Raccogliamo i dati sui prodotti nel carrello
                const cartData = cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.price * item.quantity
                }));
                
                // Calcoliamo l'importo totale
                const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                
                // Apriamo la finestra modale dell'ordine con i dati del carrello
                openCheckoutModal(cartData, totalAmount);
                
                // Chiudiamo la finestra modale del carrello
                cartModal.classList.add('hidden');
            }
        });
    }
    
    // --- Sistema di notifiche soft ---
    
    // Funzione per mostrare notifiche soft invece di alert()
    function showNotification(message, type = 'info', duration = 5000) {
        // Rimuoviamo eventuali notifiche esistenti
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Creiamo la notifica
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Definiamo le icone per ogni tipo
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icons[type] || icons.info}</span>
                <span class="notification-text">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;
        
        // Aggiungiamo al DOM
        document.body.appendChild(notification);
        
        // Mostriamo con animazione
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto-rimozione dopo la durata specificata
        if (duration > 0) {
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }, duration);
        }
    }

    // --- Logica chiusura finestra modale ORDINE ---
    
    // Troviamo la finestra modale e il pulsante di chiusura tramite i loro ID
    const orderModal = document.getElementById('order-modal');
    const closeOrderModalBtn = document.getElementById('close-order-modal-btn');

    // Verifichiamo se gli elementi esistono sulla pagina
    if (orderModal && closeOrderModalBtn) {
        
        // Aggiungiamo il gestore dell'evento "click" al pulsante di chiusura
        closeOrderModalBtn.addEventListener('click', () => {
            // Aggiungiamo la classe .hidden per nascondere la finestra
            orderModal.classList.add('hidden');
        });
    }

    // --- LOGICA PER IL MENU COMPLETO ---
    
    // Troviamo gli elementi
    const openMenuBtn = document.getElementById('open-menu-btn');
    const fullMenuModal = document.getElementById('full-menu-modal');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (openMenuBtn && fullMenuModal && closeMenuBtn) {
        // Logica apertura/chiusura
        openMenuBtn.addEventListener('click', () => {
            fullMenuModal.classList.remove('hidden');
        });
        closeMenuBtn.addEventListener('click', () => {
            fullMenuModal.classList.add('hidden');
        });
        
        // Chiusura cliccando sull'overlay
        const menuOverlay = fullMenuModal.querySelector('.modal-overlay');
        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => {
                fullMenuModal.classList.add('hidden');
            });
        }
    }

    // Popoliamo le sezioni del menu con i prodotti
    renderMenuItems('panini', 'menu-panini-container');
    renderMenuItems('pizza', 'menu-pizza-container');
    renderMenuItems('pasta', 'menu-pasta-container');
    renderMenuItems('insalate', 'menu-insalate-container');
    renderMenuItems('bevande', 'menu-bevande-container');
    
    // Логіка для кнопки "Vai al Menu" в порожньому кошику
    const goToMenuBtn = document.getElementById('go-to-menu-btn');
    const cartModalForMenu = document.getElementById('cart-modal');
    const fullMenuModalForCart = document.getElementById('full-menu-modal');

    if (goToMenuBtn) {
        goToMenuBtn.addEventListener('click', () => {
            cartModalForMenu.classList.add('hidden');
            fullMenuModalForCart.classList.remove('hidden');
        });
    }
    
    // "Оживляємо" посилання "La Nostra Storia"
    const openStoryLink = document.getElementById('open-philosophy-link'); // Ми назвали його так раніше
    const storyModal = document.getElementById('story-modal');
    const closeStoryModal = document.getElementById('close-story-modal');

    if (openStoryLink && storyModal && closeStoryModal) {
        // Відкрити вікно
        openStoryLink.addEventListener('click', (e) => {
            e.preventDefault(); // Запобігаємо переходу по посиланню
            storyModal.classList.remove('hidden');
        });

        // Закрити вікно
        closeStoryModal.addEventListener('click', () => {
            storyModal.classList.add('hidden');
        });
    }

    // --- ЛОГІКА ДЛЯ МОБІЛЬНИХ ПРИСТРОЇВ: "CHEF'S TABLE" ---
    // На мобільних пристроях :hover не працює, тому додаємо клік
    document.querySelectorAll('.dish-container').forEach(container => {
        container.addEventListener('click', () => {
            // Перемикаємо клас 'active', який буде імітувати :hover
            container.classList.toggle('active');
        });
    });
});

// --- PRIMA DICHIARIAMO TUTTE LE FUNZIONI ---

// Funzione per l'inizializzazione del sito principale (slider, pulsanti, parallax)
function initializeMainSite() {
    const body = document.body;
    let isAnimating = false;

    function setBackgroundColor(swiper) {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const bgColor = activeSlide.dataset.bgColor || '#000000'; // Колір за замовчуванням - чорний
        body.style.transition = 'background-color 0.8s ease'; // Плавна зміна фону
        body.style.backgroundColor = bgColor;
        console.log('Setting background color:', bgColor, 'for slide:', activeSlide.id || swiper.activeIndex);
    }

    function runAssemblyAnimation(activeSlide) {
        if (!activeSlide) return;
        isAnimating = true;
        const elements = activeSlide.querySelectorAll('.ingredient, .product-image, h1, .add-to-cart-btn, .description-block, .drinks-display, .drink-item, .drink-image');
        gsap.to(elements, {
            duration: 1, autoAlpha: 1, scale: 1, y: '0',
            stagger: 0.08, ease: "power2.out",
            onComplete: () => { isAnimating = false; }
        });
    }

    function runDisassemblyAnimation(slide) {
        if (!slide) return;
        const elements = slide.querySelectorAll('.ingredient, .product-image, h1, .add-to-cart-btn, .description-block, .drinks-display, .drink-item, .drink-image');
        gsap.to(elements, {
            duration: 0.5, autoAlpha: 0, scale: 0.9, y: '+=20',
            ease: "power2.in"
        });
    }

    // Функція для приховування/показування стрілок навігації
    function updateNavigationButtons(swiper) {
        const nextButton = document.querySelector('.swiper-button-next');
        const prevButton = document.querySelector('.swiper-button-prev');
        
        // Ховаємо праву стрілку на останньому слайді
        if (swiper.isEnd) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = '';
        }
        
        // Ховаємо ліву стрілку на першому слайді
        if (swiper.isBeginning) {
            prevButton.style.display = 'none';
        } else {
            prevButton.style.display = '';
        }
    }

    const swiper = new Swiper('.swiper', {
      loop: false, effect: 'fade',
      fadeEffect: { crossFade: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      speed: 1000, allowTouchMove: false, watchSlidesProgress: true,
      on: {
        init: function (swiper) {
            setBackgroundColor(swiper);
                // Avviamo l'animazione per il primo slide, già visibile
            runAssemblyAnimation(swiper.slides[swiper.activeIndex]);
            // Оновлюємо стрілки навігації
            updateNavigationButtons(swiper);
        },
        slideChange: function (swiper) {
            setBackgroundColor(swiper); // Змінюємо фон при кожній зміні слайду
            // Оновлюємо стрілки навігації
            updateNavigationButtons(swiper);
        },
        slideChangeTransitionStart: function (swiper) {
            setBackgroundColor(swiper);
            runDisassemblyAnimation(swiper.slides[swiper.previousIndex]);
        },
        slideChangeTransitionEnd: function (swiper) {
            runAssemblyAnimation(swiper.slides[swiper.activeIndex]);
        }
      }
    });

    // Effetto parallax per gli ingredienti
    window.addEventListener('mousemove', (e) => {
        if (isAnimating) return;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const activeSlide = swiper.slides[swiper.activeIndex];
        const activeIngredients = activeSlide.querySelectorAll('.ingredient');
        gsap.to(activeIngredients, {
            duration: 1,
            x: (i, target) => (window.innerWidth / 2 - mouseX) / (50 + i * 5),
            y: (i, target) => (window.innerHeight / 2 - mouseY) / (50 + i * 5),
            ease: "power1.out"
        });
    });

    // Inizializzazione della logica della finestra modale
    const orderModal = document.getElementById('order-modal');
    if (orderModal) {
    const orderForm = document.getElementById('order-form');
    const successMessage = document.getElementById('form-success-message');
    const closeModalBtn = document.getElementById('close-order-modal-btn');
    const hiddenProductNameInput = document.getElementById('product-name');

    function openModal(productName) {
        orderForm.classList.remove('hidden');
        successMessage.classList.add('hidden');
            orderForm.reset();
        hiddenProductNameInput.value = productName;
        orderModal.classList.remove('hidden');
    }

    function closeModal() {
        orderModal.classList.add('hidden');
    }
    
    // Funzione per il pagamento con carta tramite Stripe
    function handleStripePayment(formData, submitButton) {
        fetch("/.netlify/functions/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_name: formData.get('product'),
                quantity: 1
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL received');
            }
        })
        .catch((error) => {
            console.error('Stripe Error:', error);
            showNotification("Errore con il pagamento con carta. Prova il pagamento alla consegna.", 'error', 6000);
            submitButton.classList.remove('is-loading');
        });
    }
    
    // Funzione per il pagamento in contanti alla consegna
    function handleCashPayment(formData, submitButton) {
        fetch("/.netlify/functions/telegram-notifier", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            orderForm.classList.add('hidden');
            successMessage.classList.remove('hidden');

            setTimeout(() => {
                closeModal();
            }, 3000);
        })
        .catch((error) => {
            showNotification("Si è verificato un errore. Riprova.", 'error', 5000);
            console.error('Fetch Error:', error);
        })
        .finally(() => {
            submitButton.classList.remove('is-loading');
        });
    }


        closeModalBtn.addEventListener('click', closeModal);
        orderModal.querySelector('.modal-overlay').addEventListener('click', closeModal);
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !orderModal.classList.contains('hidden')) {
                closeModal();
            }
        });
        
        // ✨ LOGICA PRINCIPALE: Intercettazione invio form con supporto Stripe ✨
        orderForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // ✨ PASSAGGIO A: ATTIVIAMO STATO DI CARICAMENTO ✨
            const submitButton = document.getElementById('submit-button');
            submitButton.classList.add('is-loading');

            const formData = new FormData(orderForm);
            const paymentMethod = formData.get('payment');
            
            if (paymentMethod === 'card') {
                // Pagamento con carta tramite Stripe
                handleStripePayment(formData, submitButton);
            } else {
                // Pagamento classico alla consegna
                handleCashPayment(formData, submitButton);
            }
        });
    }
}

// --- ORA AVVIAMO LA LOGICA PRINCIPALE ---

// Registriamo il plugin ScrollTrigger per GSAP
gsap.registerPlugin(ScrollTrigger);

// Troviamo gli elementi per l'animazione intro
const panelLeft = document.querySelector('.panel-left');
const panelRight = document.querySelector('.panel-right');
const introTitles = document.querySelectorAll('.intro-title');
const mainContent = document.querySelector('main');

// Nascondiamo il contenuto principale
gsap.set(mainContent, { autoAlpha: 0 });

// Creiamo la sequenza di animazione principale
const masterTl = gsap.timeline({
    onComplete: () => {
        // Rimuoviamo completamente lo schermo intro dal DOM dopo l'animazione
        const introScreen = document.getElementById('intro-screen');
        if (introScreen) {
            introScreen.style.display = 'none'; // Rimuoviamo completamente l'elemento
            introScreen.style.pointerEvents = 'none'; // Preveniamo l'intercettazione dei clic
        }
        initializeMainSite(); // Quando intro è completato, inizializziamo il sito principale
        
        // Otteniamo accesso alla funzione globale cartLogic tramite DOMContentLoaded
        if (window.cartLogic) {
            window.cartLogic.initializeCart();
        }
    }
    
    // Ініціалізуємо інгредієнти для всіх слайдів
    initializeIngredients();
});

// Controlliamo se l'utente ha già visitato il sito (ha elementi nel carrello)
const hasVisitedBefore = localStorage.getItem('shoppingCart') !== null;

if (hasVisitedBefore) {
    // Se l'utente ha già visitato il sito, saltiamo l'animazione e mostriamo direttamente il contenuto
    console.log("Utente ritornato - saltiamo l'animazione intro");
    
    // Nascondiamo immediatamente l'intro screen
    const introScreen = document.getElementById('intro-screen');
    if (introScreen) {
        introScreen.style.display = 'none';
    }
    
    // Mostriamo il contenuto principale
    gsap.set(mainContent, { autoAlpha: 1 });
    
    // Inizializziamo il sito principale
    initializeMainSite();
    
    // Inizializziamo il carrello
    if (window.cartLogic) {
        window.cartLogic.initializeCart();
    }
} else {
    // Se è la prima visita, eseguiamo l'animazione completa
    console.log("Prima visita - eseguiamo l'animazione intro");
    
    // Aggiungiamo le animazioni alla sequenza
    masterTl
        .to(introTitles, { duration: 1.5, autoAlpha: 1, ease: "power2.out", stagger: 0.1 })
        .to({}, { duration: 1 }) // Pausa
        .to(panelLeft, { duration: 1.5, xPercent: -100, ease: "power2.inOut" })
        .to(panelRight, { duration: 1.5, xPercent: 100, ease: "power2.inOut" }, "<")
        .to(mainContent, { duration: 1.2, autoAlpha: 1, ease: "power2.out" }, "-=1.5")
        .fromTo('#cart-icon', { 
            opacity: 0, 
            x: 100, 
            y: -80, 
            scale: 0.2 
        }, { 
            opacity: 1, 
            x: 0, 
            y: 0, 
            scale: 1, 
            duration: 1.3, 
            ease: "back.out(1.5)" 
        }, "-=0.8");
}
