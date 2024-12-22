import { initializeFAQ } from './faq.js';

document.addEventListener('click', async (event) => {
    const link = event.target.closest('a[href]');
    if (link && link.origin === window.location.origin) {
        event.preventDefault();

        const url = link.href;

        try {
            const response = await fetch(url);
            if (!response.ok) return;

            const html = await response.text();
            const parser = new DOMParser();
            const newDocument = parser.parseFromString(html, 'text/html');

            // Met à jour le contenu de la page
            const newContent = newDocument.querySelector('#page-content');
            if (newContent) {
                const currentContent = document.querySelector('#page-content');
                currentContent.innerHTML = newContent.innerHTML;

                // Appelle initializePage après la mise à jour du contenu
                initializePage();
            }

            // Met à jour les styles
            updateStyles(newDocument);

            // Met à jour l'URL et remonte en haut de la page
            window.history.pushState({}, '', url);
            updateActiveLinks();
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Erreur lors du chargement de la page :', error);
        }
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

        const newContent = newDocument.querySelector('#page-content');
        if (newContent) {
            const currentContent = document.querySelector('#page-content');
            currentContent.innerHTML = newContent.innerHTML;

            // Appelle initializePage après la mise à jour du contenu
            initializePage();
        }

        // Met à jour les styles
        updateStyles(newDocument);

        // Met à jour les liens et remonte en haut de la page
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
    initializeFAQ(); 

    // Ajoute d'autres initialisations spécifiques ici si nécessaire
}

// Exécute l'initialisation au chargement initial de la page
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
});
