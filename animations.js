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
    const introScreen = document.getElementById('intro-screen');
    if (!introScreen) return;
    
    // Controllo per evitare che l'animazione si ripeta due volte
    if (introScreen.classList.contains('played')) return;
    introScreen.classList.add('played');

    const introTitles = document.querySelectorAll('.intro-title');
    const panelLeft = document.querySelector('.panel-left');
    const panelRight = document.querySelector('.panel-right');
    const mainContent = document.querySelector('.story-text-block');

    gsap.set(mainContent, { autoAlpha: 0 });

    const masterTl = gsap.timeline({
        onComplete: () => {
            if (introScreen) introScreen.style.display = 'none';
        }
    });

    masterTl
        .to(introTitles, { 
            duration: 1.5, 
            autoAlpha: 1, 
            ease: "power2.out", 
            stagger: 0.1 
        })
        .to({}, { duration: 0.5 })
        .to(panelLeft, {
            duration: 2.5,
            xPercent: -100,
            skewX: -10,
            ease: "expo.in" // ✨ MODIFICATO: ora le tende accelerano verso la fine
        })
        .to(panelRight, {
            duration: 2.5,
            xPercent: 100,
            skewX: 10,
            ease: "expo.in" // ✨ MODIFICATO: ora le tende accelerano verso la fine
        }, "<")
        .to(mainContent, { 
            duration: 1.8, 
            autoAlpha: 1, 
            y: 0,
            ease: "expo.out"
        }, "-=2.0"); // ✨ MODIFICATO: avviamo il contenuto ancora prima per una sincronizzazione perfetta 
}

