import { initializeFAQ } from './faq.js';
import { initializeRegister } from './register.js';
import { initializeLogin } from './login.js';
import { initializeAuthManager } from './AuthManager.js';
import { initializeProfile } from './profileData.js';

document.addEventListener('click', async (event) => {
    const link = event.target.closest('a[href]');
    if (link && link.origin === window.location.origin) {
        event.preventDefault();

        const url = link.href;
        console.log("Navigation vers:", url);

        try {
            const response = await fetch(url);
            if (!response.ok) return;

            const html = await response.text();
            const parser = new DOMParser();
            const newDocument = parser.parseFromString(html, 'text/html');

            window.history.pushState({}, '', url);

            const newContent = newDocument.querySelector('#page-content');
            if (newContent) {
                const currentContent = document.querySelector('#page-content');
                currentContent.innerHTML = newContent.innerHTML;

                console.log("Initialisation après navigation vers:", window.location.pathname);
                initializePage();
                
            }

            updateStyles(newDocument);
            updateActiveLinks();
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Erreur lors du chargement de la page :', error);
        }
    }
});

window.addEventListener('popstate', async () => {
    const url = window.location.href;
    console.log("Retour vers:", url);

    try {
        const response = await fetch(url);
        if (!response.ok) return;

        const html = await response.text();
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(html, 'text/html');

        const newContent = newDocument.querySelector('#page-content');
        if (newContent) {
            const currentContent = document.querySelector('#page-content');
            currentContent.innerHTML = newContent.innerHTML;

            console.log("Initialisation après retour vers:", window.location.pathname);
            initializePage();
        }

        updateStyles(newDocument);
        updateActiveLinks();
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Erreur lors du chargement de la page :', error);
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

    if (path !== '/inscription' && path !== '/connexion') {
        initializeAuthManager();
        initializeProfile();
    }
    
    if (path === '/faq') {
        initializeFAQ();
    } else if (path === '/inscription') {
        initializeRegister();
    } else if (path === '/connexion') {
        initializeLogin();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializePage();
});

export { initializePage };