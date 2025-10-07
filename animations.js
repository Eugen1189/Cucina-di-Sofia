// =======================================================
// ANIMATIONS MODULE - GSAP animations
// =======================================================

// Запобіжник для intro анімації
let hasIntroPlayed = false;

// --- MAIN SITE INITIALIZATION ---
export function initializeMainSite() {
    console.log('Main site initialized');
    // Встановлюємо темний фон для intro екрану
    document.body.style.backgroundColor = '#2d2d2d';
}

// --- ANIMAZIONI GSAP ---
export function initializeAnimations() {
    // Registra ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    console.log('GSAP animations initialized');
}

// --- INTRO ANIMATION ---
export function initializeIntroAnimation() {
    // Запобіжник: якщо анімація вже була, нічого не робимо
    if (hasIntroPlayed) {
        console.log('Intro animation already played, skipping...');
        return;
    }
    
    const introTitles = document.querySelectorAll('.intro-title');
    const panelLeft = document.querySelector('.panel-left');
    const panelRight = document.querySelector('.panel-right');
    const heroSection = document.querySelector('.hero-section');
    const storyTextBlock = document.querySelector('.story-text-block');

    console.log('Elementi intro trovati:', {
        introTitles: introTitles.length,
        panelLeft: !!panelLeft,
        panelRight: !!panelRight,
        heroSection: !!heroSection,
        storyTextBlock: !!storyTextBlock
    });

    if (!heroSection) {
        console.error('Elemento .hero-section non trovato!');
        return;
    }

    // Verifica che GSAP sia disponibile
    if (typeof gsap === 'undefined') {
        console.error('GSAP non è disponibile!');
        return;
    }
    
    // Встановлюємо прапорець, що анімація почалась
    hasIntroPlayed = true;

    // Початково ховаємо основний екран та блок з історією
    gsap.set(heroSection, { autoAlpha: 0 });
    gsap.set(storyTextBlock, { autoAlpha: 0 });

    // Створюємо головну анімаційну послідовність
        const masterTl = gsap.timeline({
            onComplete: () => {
                console.log("Animazione intro completata!");
                
                const introScreen = document.getElementById('intro-screen');
                if (introScreen) {
                    introScreen.style.display = 'none';
                    introScreen.style.pointerEvents = 'none';
                }
                
            // Set dark background for intro screen
            document.body.style.backgroundColor = '#2d2d2d';
        }
    });

    // Додаємо анімації
        masterTl
            .to(introTitles, { duration: 1.5, autoAlpha: 1, ease: "power2.out", stagger: 0.1 })
        .to({}, { duration: 0.5 }) // Невелика пауза
            .to(panelLeft, { duration: 1.5, xPercent: -100, ease: "power2.inOut" })
            .to(panelRight, { duration: 1.5, xPercent: 100, ease: "power2.inOut" }, "<")
        .to(heroSection, { duration: 0.1, autoAlpha: 1 }, "-=1.5") // Миттєво показуємо hero-section, коли штори починають роз'їжджатись
        
        // 👇 ВІДНОВЛЮЄМО АНІМАЦІЮ ПОЯВИ ТЕКСТУ 👇
        .fromTo(storyTextBlock, 
            { y: 30, opacity: 0 }, 
            { duration: 1.5, y: 0, opacity: 1, autoAlpha: 1, ease: "power2.out" }, 
            "-=0.8" // Починається трохи після початку роз'їзду штор
        );
}

