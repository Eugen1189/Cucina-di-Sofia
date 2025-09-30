// ===== BASIC SETTINGS =====
const body = document.body;
let isAnimating = false; // Flag to prevent animation conflicts

// ===== PRELOADER FUNCTIONALITY =====
// Hides the loading screen after site initialization
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

// ===== BACKGROUND COLOR MANAGEMENT =====
// Changes page background color based on active slide
function setBackgroundColor(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const bgColor = activeSlide.dataset.bgColor;
    body.style.backgroundColor = bgColor;
}

// ===== ASSEMBLY ANIMATION =====
// Shows elements when slide becomes active
function runAssemblyAnimation(activeSlide) {
    if (!activeSlide) return;
    isAnimating = true;

    // Find elements that are hidden by default (CSS)
    // Added .description-block to the animation
    const elements = activeSlide.querySelectorAll('.ingredient, .product-image, h1, .order-button, .description-block');
    
    // Animate them to visible state
    gsap.to(elements, {
        duration: 1,
        autoAlpha: 1, // GSAP automatically sets opacity: 1, visibility: visible
        scale: 1,
        y: '0',
        stagger: 0.08, // Staggered appearance for natural effect
        ease: "power2.out",
        onComplete: () => {
            isAnimating = false;
        }
    });
}

// ===== DISASSEMBLY ANIMATION =====
// Hides elements when slide becomes inactive
function runDisassemblyAnimation(slide) {
    if (!slide) return;
    
    // Find visible elements
    // Added .description-block to the animation
    const elements = slide.querySelectorAll('.ingredient, .product-image, h1, .order-button, .description-block');
    
    // Animate them to hidden state, resetting their positions
    gsap.to(elements, {
        duration: 0.5,
        autoAlpha: 0,
        scale: 0.9,
        y: '+=20',
        ease: "power2.in"
    });
}

// ===== SWIPER CONFIGURATION =====
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
        // Hide preloader after initialization
        setTimeout(hidePreloader, 1000);
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