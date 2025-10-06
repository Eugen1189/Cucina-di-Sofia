// =======================================================
// ANIMATIONS MODULE - GSAP animations e Swiper
// =======================================================

// import { initializeCart } from './cart.js'; // Removed to avoid circular dependency

// --- UTILITY FUNCTIONS ---
function setBackgroundColor(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const bgColor = activeSlide.dataset.bgColor;
    document.body.style.backgroundColor = bgColor;
}

function updateHeaderColor(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const header = document.querySelector('.main-header');
    
    if (!header) return;
    
    // Перевіряємо, чи має активний слайд клас text-dark-theme
    if (activeSlide.classList.contains('text-dark-theme')) {
        header.classList.add('text-dark');
    } else {
        header.classList.remove('text-dark');
    }
}

function runAssemblyAnimation(activeSlide) {
    if (!activeSlide) return;
    const elements = activeSlide.querySelectorAll('.product-image, .ingredient, h1, .add-to-cart-btn, .description-block, .story-text-block, .story-button');
    
    console.log('runAssemblyAnimation called for slide:', activeSlide.id || 'unknown');
    console.log('Found elements:', elements.length);
    
    gsap.to(elements, {
        duration: 1,
        autoAlpha: 1, /* Використовуйте autoAlpha для видимості та прозорості */
        y: 0,
        stagger: 0.08,
        ease: "power2.out"
    });
}

function runDisassemblyAnimation(slide) {
    if (!slide) return;
    const elements = slide.querySelectorAll('.product-image, .ingredient, h1, .add-to-cart-btn, .description-block, .story-text-block, .story-button');
    gsap.to(elements, {
        duration: 0.5, 
        autoAlpha: 0, 
        scale: 0.9, 
        y: '+=20',
        ease: "power2.in"
    });
}

// --- SWIPER INIZIALIZZAZIONE ---
export function initializeSwiper() {
    const swiperContainer = document.querySelector('.swiper');
    if (!swiperContainer) {
        console.error('Swiper container non trovato!');
        return;
    }
    
    // Verifica che Swiper sia disponibile
    if (typeof Swiper === 'undefined') {
        console.error('Swiper non è disponibile!');
        return;
    }
    
    console.log('Inizializzazione Swiper...');
    const swiper = new Swiper('.swiper', {
        loop: false,
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            // Функція, яка буде керувати видимістю UI
            _toggleStoryUI: function (swiper) {
                if (swiper.activeIndex === 0) {
                    // Якщо активний ПЕРШИЙ слайд (індекс 0)
                    document.body.classList.add('story-slide-active');
                } else {
                    // Якщо активний будь-який інший слайд
                    document.body.classList.remove('story-slide-active');
                }
            },

            // Подія, що спрацює при ініціалізації
            init: function (swiper) {
                this.params.on._toggleStoryUI(swiper); // Встановлюємо початковий стан
                
                console.log('Swiper initialized, active slide:', swiper.activeIndex);
                // Запускаємо анімацію для першого, вже видимого, слайду
                runAssemblyAnimation(swiper.slides[swiper.activeIndex]);
                updateHeaderColor(swiper); // Оновлюємо колір хедера
            },

            // Подія, що спрацює при зміні слайду
            slideChange: function (swiper) {
                this.params.on._toggleStoryUI(swiper); // Оновлюємо стан при кожній зміні

                // Оновлюємо колір хедера
                updateHeaderColor(swiper);
            },
            
            // Ваш існуючий код для анімацій
            slideChangeTransitionStart: function (swiper) {
                // Ховаємо контент попереднього слайду
                runDisassemblyAnimation(swiper.slides[swiper.previousIndex]);
            },
            slideChangeTransitionEnd: function (swiper) {
                console.log('Slide changed to:', swiper.activeIndex);
                // Показуємо контент нового активного слайду
                runAssemblyAnimation(swiper.slides[swiper.activeIndex]);
            }
        }
    });
    
    return swiper;
}

// --- ALTERNATIVE MAIN SITE INITIALIZATION ---
export function initializeMainSite() {
    const mainHeader = document.querySelector('.main-header');

    // Функція для оновлення теми хедера
    function updateHeaderTheme(swiper) {
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (activeSlide.classList.contains('text-dark-theme')) {
            mainHeader.classList.add('text-dark');
        } else {
            mainHeader.classList.remove('text-dark');
        }
    }

    const swiper = new Swiper('.swiper', {
        loop: false,
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            // Функція, яка буде керувати видимістю UI
            _toggleStoryUI: function (swiper) {
                if (swiper.activeIndex === 0) {
                    // Якщо активний ПЕРШИЙ слайд (індекс 0)
                    document.body.classList.add('story-slide-active');
                } else {
                    // Якщо активний будь-який інший слайд
                    document.body.classList.remove('story-slide-active');
                }
            },

            // Подія, що спрацює при ініціалізації
            init: function (swiper) {
                this.params.on._toggleStoryUI(swiper); // Встановлюємо початковий стан
                
                // Запускаємо анімацію для першого, вже видимого, слайду
                runAssemblyAnimation(swiper.slides[swiper.activeIndex]);
                updateHeaderTheme(swiper); // Оновлюємо колір хедера
            },

            // Подія, що спрацює при зміні слайду
            slideChange: function (swiper) {
                this.params.on._toggleStoryUI(swiper); // Оновлюємо стан при кожній зміні

                // Оновлюємо колір хедера
                updateHeaderTheme(swiper);
            },
            
            // Ваш існуючий код для анімацій
            slideChangeTransitionStart: function (swiper) {
                // Ховаємо контент попереднього слайду
                runDisassemblyAnimation(swiper.slides[swiper.previousIndex]);
            },
            slideChangeTransitionEnd: function (swiper) {
                // Показуємо контент нового активного слайду
                runAssemblyAnimation(swiper.slides[swiper.activeIndex]);
            }
        }
    });
}

// --- ANIMAZIONI GSAP ---
export function initializeAnimations() {
    // Animazione ingredienti
    function animateIngredients() {
        const activeIngredients = document.querySelectorAll('.swiper-slide-active .ingredient');
        gsap.to(activeIngredients, {
            duration: 2,
            rotation: "+=360",
            ease: "power2.inOut",
            stagger: 0.2
        });
    }

    // Registra ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
}

// --- INTRO ANIMATION ---
export function initializeIntroAnimation() {
    const introTitles = document.querySelectorAll('.intro-title');
    const panelLeft = document.querySelector('.panel-left');
    const panelRight = document.querySelector('.panel-right');
    const mainContent = document.querySelector('main');

    console.log('Elementi intro trovati:', {
        introTitles: introTitles.length,
        panelLeft: !!panelLeft,
        panelRight: !!panelRight,
        mainContent: !!mainContent
    });

    if (!mainContent) {
        console.error('Elemento main non trovato!');
        return;
    }

    // Verifica che GSAP sia disponibile
    if (typeof gsap === 'undefined') {
        console.error('GSAP non è disponibile!');
        return;
    }

    // Nascondi il contenuto principale
    gsap.set(mainContent, { autoAlpha: 0 });

    // Sempre esegui l'animazione intro (rimosso il controllo hasVisitedBefore)
    console.log("Eseguiamo sempre l'animazione intro");
    
    // Rimuovi il vecchio flag se esiste
    localStorage.removeItem('hasVisitedBefore');
    
    // Esegui sempre l'animazione completa
    console.log("Elementi per animazione:", { introTitles: introTitles.length, panelLeft: !!panelLeft, panelRight: !!panelRight });
        
        const masterTl = gsap.timeline({
            onComplete: () => {
                console.log("Animazione intro completata!");
                
                const introScreen = document.getElementById('intro-screen');
                if (introScreen) {
                    introScreen.style.display = 'none';
                    introScreen.style.pointerEvents = 'none';
                }
                
                // Animazione completata - non serve più salvare lo stato
                
                initializeSwiper();
                
                if (window.cartLogic) {
                    window.cartLogic.initializeCart();
                }
            }
        });

        masterTl
            .to(introTitles, { duration: 1.5, autoAlpha: 1, ease: "power2.out", stagger: 0.1 })
            .to({}, { duration: 1 })
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

// --- SCROLL TRIGGER ANIMATION FOR GLASS WATER ---
export function initializeWaterAnimation() {
    gsap.to("#water", {
        transform: "translate(0, 0)",
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#bevande-section",
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: function(self) {
                console.log('Water animation progress:', self.progress);
            }
        }
    });

    gsap.to("#glass-animation circle", {
        fill: "#4A90E2",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#bevande-section",
            start: "top center",
            end: "bottom center",
            scrub: 1
        }
    });
}
