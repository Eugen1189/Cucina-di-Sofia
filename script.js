// ===== BASIC SETTINGS =====
const body = document.body;
let isAnimating = false; // Flag to prevent animation conflicts

/* ====================================================== */
/* ===== ЛОГІКА ІНТРО-ЕКРАНУ ТА ЯСУТЕЦЬ ІНІЦІАЛІЗАЦІЇ САЙТУ ===== */
/* ====================================================== */

// Знаходимо елементи
const introScreen = document.querySelector('#intro-screen');
const panelLeft = document.querySelector('.panel-left');
const panelRight = document.querySelector('.panel-right');
const introTitles = document.querySelectorAll('.intro-title');
const mainContent = document.querySelector('main');

// Одразу ховаємо основний контент
gsap.set(mainContent, { autoAlpha: 0 });

// Створюємо "режисерську" послідовність для всього сайту
const masterTl = gsap.timeline();

// Фаза 1: Поява назви ресторану
masterTl.to(introTitles, {
    duration: 1.5,
    autoAlpha: 1, // Плавно робимо видимим
    ease: "power2.out",
    stagger: 0.1 // Букви з'являються з невеликою затримкою
});

// Фаза 2: Пауза, щоб глядач встиг прочитати
masterTl.to({}, { duration: 1 }); // Пуста анімація для паузи в 1 секунду

// Фаза 3: "Штори" від'їжджаються
masterTl.to(panelLeft, {
    duration: 1.2,
    xPercent: -100, // Зсуваємо ліву панель на 100% її ширини вліво
    ease: "power2.inOut"
});
masterTl.to(panelRight, {
    duration: 1.2,
    xPercent: 100, // Зсуваємо праву панель на 100% її ширини вправо
    ease: "power2.inOut"
}, "<"); // "<" - почати одночасно з попередньою анімацією

// Фаза 4: Одночасно з розсуванням штор, плавно з'являється основний контент
masterTl.to(mainContent, {
    duration: 1,
    autoAlpha: 1
}, "-=1.0"); // Починаємо за 1с до завершення розсування

// Фаза 5: Запускаємо анімацію першого слайда
// Використовуємо .call() для виклику нашої основної функції
masterTl.call(initializePage);

// =======================================================
// Весь код сайту тепер живе всередині цієї функції
function initializePage() {
    // ===== BACKGROUND COLOR MANAGEMENT =====
    // Changes page background color based on active slide
    function setBackgroundColor(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const bgColor = activeSlide.dataset.bgColor;
    body.style.backgroundColor = bgColor;
}

// ===== STABLE ASSEMBLY ANIMATION =====
// Shows elements when slide becomes active
function runAssemblyAnimation(activeSlide) {
    if (!activeSlide) return;
    isAnimating = true;

    const elements = activeSlide.querySelectorAll('.ingredient, .product-image, h1, .order-button, .description-block');
    
    gsap.to(elements, {
        duration: 1,
        autoAlpha: 1,
        scale: 1,
        y: '0',
        stagger: 0.08,
        ease: "power2.out",
        onComplete: () => {
            isAnimating = false;
        }
    });
}

// ===== STABLE DISASSEMBLY ANIMATION =====
// Hides elements when slide becomes inactive
function runDisassemblyAnimation(slide) {
    if (!slide) return;
    
    const elements = slide.querySelectorAll('.ingredient, .product-image, h1, .order-button, .description-block');
    
    gsap.to(elements, {
        duration: 0.5,
        autoAlpha: 0,
        scale: 0.9,
        y: '+=20',
        ease: "power2.in"
    });
}

// ===== STABLE SWIPER CONFIGURATION =====
// Main slider configuration with fade effect
const swiper = new Swiper('.swiper', {
  loop: false, // Disabled to prevent animation conflicts and ensure stable behavior
  effect: 'fade', // Smooth crossfade between slides
  fadeEffect: {
    crossFade: true // One slide fades out while next fades in
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 1000, // Transition duration in milliseconds
  allowTouchMove: false, // Disabled for desktop experience
  // Prevents premature rendering of next slide
  watchSlidesProgress: true,
  
  on: {
    init: function (swiper) {
        setBackgroundColor(swiper);
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

/* ====================================================== */
/* ===== ЛОГІКА МОДАЛЬНОГО ВІКНА З AJAX-ВІДПРАВКОЮ ===== */
/* ====================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Знаходимо всі елементи
    const orderModal = document.getElementById('order-modal');
    const orderForm = document.getElementById('order-form');
    const successMessage = document.getElementById('form-success-message');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const orderButtons = document.querySelectorAll('.order-button');
    const hiddenProductNameInput = document.getElementById('product-name');

    if (!orderModal || !orderForm) return;

    // Функція для відкриття вікна
    function openModal(productName) {
        // Скидаємо стан форми: показуємо форму, ховаємо повідомлення
        orderForm.classList.remove('hidden');
        successMessage.classList.add('hidden');
        orderForm.reset(); // Очищуємо поля
        
        hiddenProductNameInput.value = productName;
        orderModal.classList.remove('hidden');
    }

    // Функція для закриття вікна
    function closeModal() {
        orderModal.classList.add('hidden');
    }

    // Навішуємо обробники на кнопки "Ordina Ora"
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activeSlide = swiper.slides[swiper.activeIndex];
            const productName = activeSlide.querySelector('h1').textContent;
            openModal(productName);
        });
    });

    // Обробники закриття вікна
    closeModalBtn.addEventListener('click', closeModal);
    orderModal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !orderModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // ✨ ГОЛОВНА ЛОГІКА: Перехоплення відгрузки форми ✨
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // ✨ КРОК А: ВМИКАЄМО СТАН ЗАВАНТАЖЕННЯ ✨
        const submitButton = document.getElementById('submit-button');
        submitButton.classList.add('is-loading');

        const formData = new FormData(orderForm);
        
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
            // ✨ КРОК Б: ВИМИКАЄМО СТАН ЗАВАНТАЖЕННЯ (завжди, і при успіху, і при помилці) ✨
            submitButton.classList.remove('is-loading');
        });
    });
});

// ===== PARALLAX EFFECT =====
// Interactive mouse movement effect for ingredients
window.addEventListener('mousemove', (e) => {
    if (isAnimating) return; // Prevent parallax during animations
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const activeSlide = swiper.slides[swiper.activeIndex];
    const activeIngredients = activeSlide.querySelectorAll('.ingredient');
    
    // Apply parallax movement based on mouse position
    gsap.to(activeIngredients, {
        duration: 1,
        x: (i, target) => (window.innerWidth / 2 - mouseX) / (50 + i * 5),
        y: (i, target) => (window.innerHeight / 2 - mouseY) / (50 + i * 5),
        ease: "power1.out"
    });
});

} // Кінець функції initializePage
