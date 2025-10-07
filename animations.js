// =======================================================
// ANIMATIONS MODULE - GSAP animations
// =======================================================

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
                
                // Set dark background for intro screen
                document.body.style.backgroundColor = '#2d2d2d';
            }
        });

        masterTl
            .to(introTitles, { duration: 1.5, autoAlpha: 1, ease: "power2.out", stagger: 0.1 })
            .to({}, { duration: 1 })
            .to(panelLeft, { duration: 1.5, xPercent: -100, ease: "power2.inOut" })
            .to(panelRight, { duration: 1.5, xPercent: 100, ease: "power2.inOut" }, "<")
            .to(mainContent, { duration: 1.2, autoAlpha: 1, ease: "power2.out" }, "-=1.5");
}

