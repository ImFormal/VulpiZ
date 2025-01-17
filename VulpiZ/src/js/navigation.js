import { initializeFAQ } from './faq.js';
import { initializeRegister } from './register.js';
import { initializeLogin } from './login.js';
import { initializeAuthManager } from './AuthManager.js';
import { initializeProfile } from './profileData.js';
import { initializeLeaderboard } from './leaderboard.js';

async function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    loadingScreen.innerHTML = `
        <div style="text-align: center;">
            <div style="color: white;">Chargement...</div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    loadingScreen.style.transition = 'opacity 0.5s';
    loadingScreen.style.opacity = '0';
    
    await new Promise(resolve => setTimeout(resolve, 500));
    loadingScreen.remove();
}

// Fonction pour extraire et mettre à jour le titre depuis le nouveau document
function updatePageTitleFromDocument(newDocument) {
    const newTitle = newDocument.title;
    if (newTitle) {
        document.title = newTitle;
    }
}

document.addEventListener('click', async (event) => {
    const link = event.target.closest('a[href]');
    if (!link || link.origin !== window.location.origin) return;

    event.preventDefault();
    const url = link.href;
    const isArrowNav = link.classList.contains('arrow');

    try {
        const currentContent = document.querySelector('#page-content');
        
        if (isArrowNav) {
            const exitDirection = link.classList.contains('left') ? 'left' : 'right';
            currentContent.classList.add(`slide-${exitDirection}-exit`);
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        const response = await fetch(url);
        if (!response.ok) return;

        const html = await response.text();
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(html, 'text/html');

        window.history.pushState({}, '', url);

        // Mise à jour du titre depuis le nouveau document
        updatePageTitleFromDocument(newDocument);

        const newContent = newDocument.querySelector('#page-content');
        if (newContent) {
            currentContent.innerHTML = newContent.innerHTML;

            if (isArrowNav) {
                const enterDirection = link.classList.contains('left') ? 'right' : 'left';
                currentContent.classList.add(`slide-${enterDirection}-enter`);
                
                setTimeout(() => {
                    currentContent.classList.remove(
                        'slide-left-exit', 
                        'slide-right-exit',
                        'slide-left-enter', 
                        'slide-right-enter'
                    );
                }, 500);
            }

            initializePage();
        }

        updateStyles(newDocument);
        updateActiveLinks();
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Erreur lors du chargement de la page:', error);
    }
});

window.addEventListener('popstate', async () => {
    const url = window.location.href;
    try {
        const response = await fetch(url);
        if (!response.ok) return;

        const html = await response.text();
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(html, 'text/html');

        // Mise à jour du titre depuis le nouveau document
        updatePageTitleFromDocument(newDocument);

        const newContent = newDocument.querySelector('#page-content');
        if (newContent) {
            const currentContent = document.querySelector('#page-content');
            currentContent.innerHTML = newContent.innerHTML;
            initializePage();
        }

        updateStyles(newDocument);
        updateActiveLinks();
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Erreur lors du chargement de la page:', error);
    }
});

function updateStyles(newDocument) {
    const newStyles = Array.from(newDocument.getElementsByTagName('style'));
    const currentStyles = Array.from(document.getElementsByTagName('style'));

    currentStyles.forEach(style => {
        if (!style.hasAttribute('data-global')) {
            style.remove();
        }
    });

    newStyles.forEach(style => {
        if (!style.hasAttribute('data-global')) {
            document.head.appendChild(style.cloneNode(true));
        }
    });
}

function updateActiveLinks() {
    const currentUrl = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentUrl) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initializePage() {
    const path = window.location.pathname;
    console.log("Initialisation de la page:", path);

    if (path !== '/inscription' && path !== '/connexion' && path !== '/mentionsLegales-v') {
        initializeAuthManager();
        initializeProfile();
    }
    
    if (path === '/faq') {
        initializeFAQ();
    } else if (path === '/inscription') {
        initializeRegister();
    } else if (path === '/connexion') {
        initializeLogin();
    } else if (path === '/classements') {
        initializeLeaderboard();
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await showLoadingScreen();
    initializePage();
});

export { initializePage };