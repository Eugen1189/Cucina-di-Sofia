// =================================================================
// ✨ ФІНАЛЬНА, СПРОЩЕНА ТА СТАБІЛЬНА ВЕРСІЯ SCRIPT.JS ✨
// =================================================================

// =======================================================
// МОДЕЛЬ ДАНИХ (НАШЕ МЕНЮ)
// =======================================================
const menu = [
  {
    id: 1,
    name: 'Prosciutto e Mozzarella',
    description: 'Класичний італійський паніні зі свіжою моцарелою, пікантним прошутто та руколою.',
    price: 150,
    image: 'images/panini.png', // Використовуємо локальні зображення
    category: 'panini'
  },
  {
    id: 2,
    name: 'Margherita Classica', 
    description: 'Піца італійська традиційна з томатним соусом, свіжою моцарелою, базиліком.',
    price: 250,
    image: 'images/pizza.png', // Використовуємо локальні зображення
    category: 'pizza'
  },
  {
    id: 3,
    name: 'Pasta al Pesto',
    description: 'Ароматна паста з песто, приготованим вручну з базиліку, пармезану та горіхів.',
    price: 200,
    image: 'images/pasta.png', // Використовуємо локальні зображення  
    category: 'pasta'
  },
  // --- Нова категорія: Напої ---
  {
    id: 101,
    name: 'Aranciata Rossa',
    description: 'Освіжаюча італійська содова з соком червоних апельсинів.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1598991965487-9b23b37a4a28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'bevande' 
  },
  {
    id: 102,
    name: 'Acqua Minerale',
    description: 'Чиста мінеральна вода, газована або негазована.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'bevande'
  }
];

// Поки що пустий масив для товарів у кошику
let cartItems = [];

// =======================================================
// ЛОГІКА ВІДОБРАЖЕННЯ ТОВАРІВ
// =======================================================

function renderMenuItems(category, containerId) {
    console.log(`Rendering items for category "${category}" in container "${containerId}"`);
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Контейнер з ID "${containerId}" не знайдено!`);
        return;
    }
    
    console.log(`Container found:`, container);

    // 1. Фільтруємо меню, щоб отримати товари тільки потрібної категорії
    const itemsToRender = menu.filter(item => item.category === category);
    
    console.log(`Found ${itemsToRender.length} items for category "${category}":`, itemsToRender);

    // 2. Генеруємо HTML-картку для кожного товару
    const html = itemsToRender.map(item => `
        <div class="product-card">
            <img src="${item.image}" alt="${item.name}" class="product-image">
            <h3 class="product-name">${item.name}</h3>
            <p class="product-description">${item.description}</p>
            <div class="product-footer">
                <span class="product-price">${item.price} EUR</span>
                <button class="add-to-cart-btn" data-id="${item.id}">Aggiungi</button>
            </div>
        </div>
    `).join('');

    // 3. Вставляємо згенерований HTML у контейнер
    console.log(`Generated HTML:`, html);
    container.innerHTML = html;
    console.log(`Successfully rendered ${itemsToRender.length} items in container`);
}

// =======================================================
// ЛОГІКА КОШИКА
// =======================================================

// Масив для товарів у кошику (ми його оголосили раніше)
// let cartItems = []; 

function addToCart(productId) {
    // Шукаємо, чи є вже такий товар у кошику
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        // Якщо є, просто збільшуємо кількість
        existingItem.quantity++;
    } else {
        // Якщо немає, знаходимо товар у головному меню
        const itemToAdd = menu.find(item => item.id === productId);
        if (itemToAdd) {
            // і додаємо його в кошик з кількістю 1
            cartItems.push({ ...itemToAdd, quantity: 1 });
        }
    }

    // Після кожної зміни викликаємо функцію оновлення кошика
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const cartCounter = document.getElementById('cart-counter');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    // 1. Очищуємо контейнер перед оновленням
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Ваш кошик порожній.</p>';
    } else {
        // 2. Генеруємо HTML для кожного товару в кошику
        cartItems.forEach(item => {
            const cartItemHTML = `
                <div class="cart-item">
                    <span>${item.name} (x${item.quantity})</span>
                    <span>${item.price * item.quantity} грн</span>
                </div>
            `;
            cartContainer.innerHTML += cartItemHTML;
        });
    }

    // 3. Рахуємо загальну кількість товарів та загальну суму
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 4. Оновлюємо лічильник на іконці та загальну суму
    cartCounter.textContent = totalQuantity;
    cartTotalPrice.textContent = `${totalPrice} грн`;

    // 5. Зберігаємо кошик у localStorage, щоб він не зникав після перезавантаження
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
}

// =======================================================
// ГОЛОВНА ЛОГІКА (ОНОВЛЕНА)
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Завантажуємо кошик з localStorage ---
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCart(); // Оновлюємо відображення одразу
    }

    // --- 2. Відображаємо всі категорії товарів ---
    renderMenuItems('panini', 'panini-container'); 
    renderMenuItems('pizza', 'pizza-container');   
    renderMenuItems('pasta', 'pasta-container');   
    renderMenuItems('bevande', 'drinks-container'); 
    
    // --- 3. Логіка відкриття/закриття кошика ---
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCartBtn = document.getElementById('close-cart-btn');

    cartIcon.addEventListener('click', () => cartModal.classList.remove('hidden'));
    closeCartBtn.addEventListener('click', () => cartModal.classList.add('hidden'));
    cartModal.addEventListener('click', (event) => {
        if (event.target === cartModal) cartModal.classList.add('hidden');
    });

    // --- 4. Делегування подій для кнопок "Додати" ---
    document.body.addEventListener('click', (event) => {
        // Перевіряємо, чи клікнули ми саме на кнопку з класом 'add-to-cart-btn'
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(event.target.dataset.id); // Отримуємо id товару
            addToCart(productId);
        }
    });

    // Зберігаємо дані для доступу з інтро
    window.cartLogic = {
        initializeCart: function() {
            // Ініціалізація кошика буде викликана після завантаження intro
            updateCart();
        }
    };
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
        const elements = activeSlide.querySelectorAll('.ingredient, .product-image, h1, .order-button, .description-block, .drinks-display, .drink-item, .drink-image');
        gsap.to(elements, {
            duration: 1, autoAlpha: 1, scale: 1, y: '0',
            stagger: 0.08, ease: "power2.out",
            onComplete: () => { isAnimating = false; }
        });
    }

    function runDisassemblyAnimation(slide) {
        if (!slide) return;
        const elements = slide.querySelectorAll('.ingredient, .product-image, h1, .order-button, .description-block, .drinks-display, .drink-item, .drink-image');
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
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const orderButtons = document.querySelectorAll('.order-button');
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
    .fromTo('#drinks-section', { 
        opacity: 0, 
        x: 120, 
        y: 80, 
        scale: 0.7 
    }, { 
        opacity: 1, 
        x: 0, 
        y: 0, 
        scale: 1, 
        duration: 1.5, 
        ease: "power3.out" 
    }, "-=1.0")
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