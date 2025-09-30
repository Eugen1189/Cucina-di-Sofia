// ===== BASIC SETTINGS =====
const body = document.body;
let isAnimating = false; // Flag to prevent animation conflicts

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