// =================================================================
// ✨ ФІНАЛЬНА, СПРОЩЕНА ТА СТАБІЛЬНА ВЕРСІЯ SCRIPT.JS ✨
// =================================================================

// =======================================================
// ЄДИНИЙ БЛОК ЛОГІКИ КОШИКА (ВЕРСІЯ 3.0)
// =======================================================

// --- 1. МОДЕЛЬ ДАНИХ ---
const menu = [
  { id: 1, name: 'Prosciutto e Mozzarella', description: 'Класичний італійський паніні зі свіжою моцарелою та пікантним прошутто', price: 150, image: 'images/panini.png', category: 'panini' },
  { id: 2, name: 'Caprese', description: 'Соковиті томати, моцарела ді буфала та свіжий базилік', price: 130, image: 'images/panini.png', category: 'panini' },
  // Додайте сюди ваші піци та пасти з правильними категоріями
  { id: 201, name: 'Pizza Margherita', description: 'Піца італійська традиційна з томатним соусом та свіжою моцарелою', price: 200, image: 'images/pizza.png', category: 'pizza' },
  { id: 301, name: 'Pasta Carbonara', description: 'Ароматна паста з песто, приготованим вручну з базиліку та пармезану', price: 180, image: 'images/pasta.png', category: 'pasta' },
  // Напої
  { id: 101, name: 'Aranciata Rossa', description: 'Освіжаюча італійська содова з соком червоних апельсинів', price: 60, image: 'https://images.unsplash.com/photo-1598991965487-9b23b37a4a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', category: 'bevande' },
  { id: 102, name: 'Acqua Minerale', description: 'Чиста мінеральна вода, газована або негазована', price: 40, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', category: 'bevande' }
];

let cartItems = [];

// Секції товарів видалено - усі кнопки кошика знаходяться в Swiper слайдах

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

// Функція addDrinkToCart видалена, оскільки нова версія використовує тільки текст

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
        // 2. Generiamo HTML per ogni prodotto nel carrello (con pulsanti +/- e rimozione)
        cartItems.forEach(item => {
            const cartItemHTML = `
                <div class="cart-item">
                    <span class="cart-item-name">${item.name}</span>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease-quantity-btn" data-id="${item.id}">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn increase-quantity-btn" data-id="${item.id}">+</button>
                    </div>
                    <span class="cart-item-price">${item.price * item.quantity} EUR</span>
                    <button class="remove-from-cart-btn" data-id="${item.id}">❌</button>
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

// --- 3. ЗАПУСК ПІСЛЯ ЗАВАНТАЖЕННЯ СТОРІНКИ ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("КРОК 1: Сторінка завантажена. Запускаємо скрипт.");

    // Секції товарів видалено - товари доступні тільки через Swiper слайди"

    // Завантажуємо кошик
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCart();
    }
    
    // Головний слухач кліків
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
                alert('Il tuo carrello è vuoto. Aggiungi prodotti prima di completare l\'ordine.');
                return;
            }
            
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
        });
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
});

// --- СПОЧАТКУ ОГОЛОШУЄМО ВСІ ФУНКЦІЇ ---

// Функція для ініціалізації основного сайту (слайдер, кнопки, паралакс)
function initializeMainSite() {
    const body = document.body;
    let isAnimating = false;

    function setBackgroundColor(swiper) {
        const activeSlide = swiper.slides[swiper.activeIndex];
        const bgColor = activeSlide.dataset.bgColor;
        body.style.backgroundColor = bgColor;
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

    const swiper = new Swiper('.swiper', {
      loop: false, effect: 'fade',
      fadeEffect: { crossFade: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      speed: 1000, allowTouchMove: false, watchSlidesProgress: true,
      on: {
        init: function (swiper) {
            setBackgroundColor(swiper);
                // Запускаємо анімацію для першого слайда, який вже видимий
            runAssemblyAnimation(swiper.slides[swiper.activeIndex]);
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

    // Паралакс-ефект для інградієнтів
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

    // Ініціалізація логіки модального вікна
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
    
    // Функція для оплати карткою через Stripe
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
            alert("Помилка з платежем карткою. Спробуйте оплату заради доставкою.");
            submitButton.classList.remove('is-loading');
        });
    }
    
    // Функція для оплати готівкою при доставці
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
            alert("Сталася помилка. Спробуйте ще раз.");
            console.error('Fetch Error:', error);
        })
        .finally(() => {
            submitButton.classList.remove('is-loading');
        });
    }

        orderButtons.forEach(button => {
            button.addEventListener('click', () => {
                const activeSlide = swiper.slides[swiper.activeIndex];
                
                // Знаходимо відповідний продукт в меню за назвою слайда
                const slideTitle = activeSlide.querySelector('h1').textContent.toLowerCase();
                let product = null;
                
                // Визначаємо продукт за назвою слайда
                if (slideTitle.includes('panini') || slideTitle.includes('паніні')) {
                    product = menu.find(item => item.category === 'panini');
                } else if (slideTitle.includes('pizza') || slideTitle.includes('піца')) {
                    product = menu.find(item => item.category === 'pizza');
                } else if (slideTitle.includes('pasta') || slideTitle.includes('паста')) {
                    product = menu.find(item => item.category === 'pasta');
                } else if (slideTitle.includes('bevande') || slideTitle.includes('напої')) {
                    // Для слайда напоїв показуємо модальне вікно "Bevande Italiane"
                    openModal('Bevande Italiane');
                    return;
                }
                
                // Використовуємо дані з меню або fallback на назву слайда
                const productName = product ? product.name : slideTitle;
                console.log('Обрані дані продукту:', product);
                openModal(productName);
            });
        });

        closeModalBtn.addEventListener('click', closeModal);
        orderModal.querySelector('.modal-overlay').addEventListener('click', closeModal);
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !orderModal.classList.contains('hidden')) {
                closeModal();
            }
        });
        
        // ✨ ГОЛОВНА ЛОГІКА: Перехоплення відправки форми з підтримкою Stripe ✨
        orderForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // ✨ КРОК А: ВМИКАЄМО СТАН ЗАВАНТАЖЕННЯ ✨
            const submitButton = document.getElementById('submit-button');
            submitButton.classList.add('is-loading');

            const formData = new FormData(orderForm);
            const paymentMethod = formData.get('payment');
            
            if (paymentMethod === 'card') {
                // Оплата карткою через Stripe
                handleStripePayment(formData, submitButton);
            } else {
                // Класична оплата при доставці
                handleCashPayment(formData, submitButton);
            }
        });
    }
}

// --- ТЕПЕР ЗАПУСКАЄМО ГОЛОВНУ ЛОГІКУ ---

// Реєструємо ScrollTrigger плагін для GSAP
gsap.registerPlugin(ScrollTrigger);

// Знаходимо елементи для інтро-анімації
const panelLeft = document.querySelector('.panel-left');
const panelRight = document.querySelector('.panel-right');
const introTitles = document.querySelectorAll('.intro-title');
const mainContent = document.querySelector('main');

// Ховаємо основний контент
gsap.set(mainContent, { autoAlpha: 0 });

// Створюємо головну анімаційну послідовність
const masterTl = gsap.timeline({
    onComplete: () => {
        // Повністю прибираємо інtro-екран з DOM після анімації
        const introScreen = document.getElementById('intro-screen');
        if (introScreen) {
            introScreen.style.display = 'none'; // Повністю прибираємо елемент
            introScreen.style.pointerEvents = 'none'; // Запобігаємо перехопленню кліків
        }
        initializeMainSite(); // Коли інтро завершено, ініціалізуємо основний сайт
        
        // Отримуємо доступ до глобальної функції cartLogic через DOMContentLoaded
        if (window.cartLogic) {
            window.cartLogic.initializeCart();
        }
    }
});

// Додаємо анімації в послідовність
masterTl
    .to(introTitles, { duration: 1.5, autoAlpha: 1, ease: "power2.out", stagger: 0.1 })
    .to({}, { duration: 1 }) // Пауза
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

// ===== SCROLL TRIGGER ANIMATION FOR GLASS WATER =====
// Анімація води в стакані при скролі до секції напоїв
gsap.to("#water", {
    transform: "translate(0, 0)", // Рухаємо рідину вгору на її кінцеву позицію
    scrollTrigger: {
        trigger: "#bevande-section", // ID секції з напоями
        start: "top center",      // Анімація почнеться, коли верх секції досягне центру екрана
        end: "bottom center",     // Анімація закінчиться, коли низ секції досягне центру
        scrub: true,              // "Прив'язує" анімацію до прогресу скролу
        markers: false,           // Вимкнено маркери для продакшну (можна увімкнути для налагодження)
        onUpdate: (self) => {
            // Додаткова логіка при оновленні анімації (опціонально)
            console.log('Water animation progress:', self.progress);
        }
    }
});

// Додаткова анімація для пухирців у воді
gsap.to("#glass-animation circle", {
    scale: 1.2,
    opacity: 0.8,
    scrollTrigger: {
        trigger: "#bevande-section",
        start: "top center",
        end: "bottom center",
        scrub: 0.5, // Менша чутливість для плавнішої анімації
        markers: false
    }
});