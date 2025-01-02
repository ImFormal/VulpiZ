import { auth } from '../firebase/firebaseConfig';

const defaultUserData = {
    pseudo_utilisateur: "unknown",
    monnaie_utilisateur: 0,
    lvl_utilisateur: 1,
    xp_utilisateur: 0,
    url_avatar: '/src/assets/default.png',
    nom_titre: 'Renardo'
};

let isInitialized = false;
let currentUserData = defaultUserData;

export function getDefaultUserData() {
    return {...defaultUserData};
}

async function checkForUpdates(uid) {
    try {
        const response = await fetch('/api/user-data?uid=' + uid);
        if (!response.ok) throw new Error('Erreur API');
        
        const newData = await response.json();
        
        // Comparer chaque propriété et mettre à jour si différente
        Object.keys(newData).forEach(key => {
            if (newData[key] !== currentUserData[key]) {
                currentUserData[key] = newData[key];
                // Mettre à jour uniquement les éléments UI concernés
                updateSpecificUI(key, newData[key]);
            }
        });
        
    } catch (error) {
        console.error('Erreur lors de la vérification des mises à jour:', error);
    }
}

function updateSpecificUI(key, value) {
    switch(key) {
        case 'pseudo_utilisateur':
            document.querySelectorAll('.pseudo').forEach(element => {
                if (element) element.textContent = value;
            });
            break;
        case 'nom_titre':
            document.querySelectorAll('.titre').forEach(element => {
                if (element) element.textContent = `[${value}]`;
            });
            break;
        case 'monnaie_utilisateur':
            document.querySelectorAll('.currency-amount').forEach(element => {
                if (element) element.textContent = `Monnaie : ${value.toLocaleString()} credits`;
            });
            break;
        case 'lvl_utilisateur':
        case 'xp_utilisateur':
            // Mettre à jour le niveau et l'XP ensemble car ils sont liés
            document.querySelectorAll('.level-text').forEach(element => {
                if (element) element.textContent = `Level ${currentUserData.lvl_utilisateur} (${currentUserData.xp_utilisateur.toLocaleString()} / 1000 xp)`;
            });
            document.querySelectorAll('.progress').forEach(element => {
                if (element) element.style.width = `${(currentUserData.xp_utilisateur / 1000) * 100}%`;
            });
            break;
        case 'url':
            document.querySelectorAll('.profile-image').forEach(element => {
                if (element) element.src = value;
            });
            break;
    }
}

export function initializeProfile() {
    const profileContent = document.querySelector('.profile-container');
    if (!profileContent) return;

    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            console.log("Aucun utilisateur connecté");
            return;
        }

        if (!isInitialized) {
            // Premier chargement
            try {
                const response = await fetch('/api/user-data?uid=' + user.uid);
                if (!response.ok) throw new Error('Erreur API');
                
                currentUserData = await response.json();
                isInitialized = true;
                updateProfileUI(currentUserData);

                // Démarrer la vérification des mises à jour
                //setInterval(() => checkForUpdates(user.uid), 1000);
            } catch (error) {
                console.error('Erreur:', error);
            }
        } else {
            updateProfileUI(currentUserData);
        }
    });
}

function updateProfileUI(userData) {
    const elements = {
        pseudo: document.querySelectorAll('.pseudo'),
        email: document.querySelectorAll('#userEmail'),
        titre: document.querySelectorAll('.titre'),
        monnaie: document.querySelectorAll('.currency-amount'),
        level: document.querySelectorAll('.level-text'),
        progress: document.querySelectorAll('.progress'),
        avatar: document.querySelectorAll('.profile-image')
    };
 
    Object.values(elements).forEach(elementList => {
        elementList.forEach(element => {
            if (element) element.style.margin = '0';
        });
    });
 
    elements.pseudo.forEach(element => {
        if (element) element.textContent = userData.pseudo_utilisateur;
    });
 
    elements.email.forEach(element => {
        if (element && auth.currentUser) element.textContent = auth.currentUser.email;
    });
 
    elements.titre.forEach(element => {
        if (element) element.textContent = `[${userData.nom_titre}]`;
    });
 
    elements.monnaie.forEach(element => {
        if (element) element.textContent = `Monnaie : ${userData.monnaie_utilisateur.toLocaleString()} credits`;
    });
 
    elements.level.forEach(element => {
        if (element) element.textContent = `Level ${userData.lvl_utilisateur} (${userData.xp_utilisateur.toLocaleString()} / 1000 xp)`;
    });
 
    elements.progress.forEach(element => {
        if (element) element.style.width = `${(userData.xp_utilisateur / 1000) * 100}%`;
    });
 
    elements.avatar.forEach(element => {
        if (element && userData.url) element.src = userData.url;
    });
 }