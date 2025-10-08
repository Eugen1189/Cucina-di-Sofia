// =======================================================
// ANIMATIONS MODULE - GSAP animations
// =======================================================

// Flag per l'animazione intro
let hasIntroPlayed = false;

// --- INIZIALIZZAZIONE SITO PRINCIPALE ---
export function initializeMainSite() {
    console.log('Sito principale inizializzato');
    // Impostiamo lo sfondo scuro per la schermata intro
    document.body.style.backgroundColor = '#2d2d2d';
}

// --- ANIMAZIONI GSAP ---
export function initializeAnimations() {
    // Registra ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    console.log('GSAP animations initialized');
}

// --- ANIMAZIONE INTRO ---
export function initializeIntroAnimation() {
    // Controllo: se l'animazione è già stata eseguita, non facciamo nulla
    if (hasIntroPlayed) {
        console.log('Animazione intro già eseguita, salto...');
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
    
    // Impostiamo il flag che l'animazione è iniziata
    hasIntroPlayed = true;

    // Inizialmente nascondiamo la schermata principale e il blocco storia
    gsap.set(heroSection, { autoAlpha: 0 });
    gsap.set(storyTextBlock, { autoAlpha: 0 });

    // Creiamo la sequenza principale di animazioni
        const masterTl = gsap.timeline({
            onComplete: () => {
                console.log("Animazione intro completata!");
                
                const introScreen = document.getElementById('intro-screen');
                if (introScreen) {
                    introScreen.style.display = 'none';
                    introScreen.style.pointerEvents = 'none';
                }
                
            // Impostiamo lo sfondo scuro per la schermata intro
            document.body.style.backgroundColor = '#2d2d2d';
        }
    });

    // Aggiungiamo le animazioni
        masterTl
            .to(introTitles, { duration: 1.5, autoAlpha: 1, ease: "power2.out", stagger: 0.1 })
        .to({}, { duration: 0.5 }) // Пауза
            .to(panelLeft, {
                duration: 2.5, // Збільшуємо тривалість для більшої величності
                xPercent: -100,
                skewX: -15,    // Нахиляємо панель, створюючи перспективу
                ease: "power3.inOut" // Робимо рух більш драматичним
            })
            .to(panelRight, {
                duration: 2.5,
                xPercent: 100,
                skewX: 15,     // Нахиляємо в інший бік
                ease: "power3.inOut"
            }, "<") // "<" змушує анімації запускатися одночасно
        .to(heroSection, { duration: 0.1, autoAlpha: 1 }, "-=2.5") // Mostriamo istantaneamente hero-section quando i pannelli iniziano ad aprirsi
        
        // Ripristiniamo l'animazione di apparizione del testo
        .fromTo(storyTextBlock, 
            { y: 30, opacity: 0 }, 
            { duration: 1.5, y: 0, opacity: 1, autoAlpha: 1, ease: "power2.out" }, 
            "-=0.8" // Inizia poco dopo l'apertura dei pannelli
        );
}

