// ===== BASIC SETTINGS =====
const body = document.body;
let isAnimating = false; // Flag to prevent animation conflicts

// Новий код для анімації інтро
const introScreen = document.querySelector('#intro-screen');
const introTitle = document.querySelector('.intro-title');
const mainContent = document.querySelector('main');

// Ховаємо основний контент на старті
gsap.set(mainContent, { autoAlpha: 0 });

const introTl = gsap.timeline();

introTl
    .to(introTitle, { duration: 1.5, autoAlpha: 1, ease: "power2.out" })
    .to(introTitle, { duration: 1, autoAlpha: 0, delay: 1, ease: "power2.in" })
    .to(introScreen, { duration: 1.2, yPercent: -100, ease: "power2.inOut" })
    .to(mainContent, { duration: 0.5, autoAlpha: 1 }, "-=0.8"); // Показуємо основний контент

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
/* ===== ЛОГІКА МОДАЛЬНОГО ВІКНА ЗАМОВЛЕННЯ ===== */
/* ====================================================== */

// ✨ Чекаємо, поки весь HTML буде завантажено
document.addEventListener('DOMContentLoaded', () => {

    // Знаходимо всі необхідні елементи
    const orderModal = document.getElementById('order-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const orderButtons = document.querySelectorAll('.order-button');
    const hiddenProductNameInput = document.getElementById('product-name');

    // Перевіряємо, чи всі елементи знайдено, щоб уникнути помилок
    if (!orderModal || !closeModalBtn || orderButtons.length === 0) {
        console.error('Не вдалося знайти елементи модального вікна. Перевірте HTML.');
        return;
    }

    // Функція для відкриття вікна
    function openModal(productName) {
        hiddenProductNameInput.value = productName;
        orderModal.classList.remove('hidden');
    }

    // Функція для закриття вікна
    function closeModal() {
        orderModal.classList.add('hidden');
    }

    // Навішуємо обробники подій
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activeSlide = swiper.slides[swiper.activeIndex];
            const productName = activeSlide.querySelector('h1').textContent;
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
