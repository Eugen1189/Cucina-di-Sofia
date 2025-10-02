// =================================================================
// ✨ ФІНАЛЬНА, СПРОЩЕНА ТА СТАБІЛЬНА ВЕРСІЯ SCRIPT.JS ✨
// =================================================================

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
        const elements = activeSlide.querySelectorAll('.ingredient, .product-image, h1, .order-button, .description-block');
        gsap.to(elements, {
            duration: 1, autoAlpha: 1, scale: 1, y: '0',
            stagger: 0.08, ease: "power2.out",
            onComplete: () => { isAnimating = false; }
        });
    }

    function runDisassemblyAnimation(slide) {
        if (!slide) return;
        const elements = slide.querySelectorAll('.ingredient, .product-image, h1, .order-button, .description-block');
        gsap.to(elements, {
            duration: 0.5, autoAlpha: 0, scale: 0.9, y: '+=20',
            ease: "power2.in"
        });
    }

    console.log('Створюємо Swiper instance...');
    const swiper = new Swiper('.swiper', {
        loop: false, effect: 'fade',
        fadeEffect: { crossFade: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        speed: 1000, allowTouchMove: false, watchSlidesProgress: true,
        on: {
            init: function (swiper) {
                console.log('Swiper ініціалізований! Active index:', swiper.activeIndex);
                console.log('Кілікіст слайдів:', swiper.slides.length);
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
                console.log('Кнопка натиснута!');
                console.log('Swiper:', swiper);
                console.log('Active slide:', swiper.slides[swiper.activeIndex]);
                
                const activeSlide = swiper.slides[swiper.activeIndex];
        
                if (!activeSlide) {
                    console.error('Active slide не знайдено!');
                    return;
                }
                
                const productElement = activeSlide.querySelector('h1');
                if (!productElement) {
                    console.error('H1 продукту не знайдено!');
                    return;
                }
                
                const productName = productElement.textContent;
                console.log('Назва продукту:', productName);
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
    onComplete: initializeMainSite // Коли інтро завершено, ініціалізуємо основний сайт
});

// Додаємо анімації в послідовність
masterTl
    .to(introTitles, { duration: 1.5, autoAlpha: 1, ease: "power2.out", stagger: 0.1 })
    .to({}, { duration: 1 }) // Пауза
    .to(panelLeft, { duration: 1.5, xPercent: -100, ease: "power2.inOut" })
    .to(panelRight, { duration: 1.5, xPercent: 100, ease: "power2.inOut" }, "<")
    .to(mainContent, { duration: 1.2, autoAlpha: 1, ease: "power2.out" }, "-=1.5");