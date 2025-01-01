import { auth } from '../firebase/firebaseConfig';

export function initializeProfile() {
    const profileContent = document.querySelector('.profile-container');
    if (!profileContent) return;

    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            console.log("Aucun utilisateur connecté");
            return;
        }

        try {
            const response = await fetch('/api/user-data?uid=' + user.uid);
            if (!response.ok) throw new Error('Erreur API');
            
            const userData = await response.json();
            updateProfileUI(userData);
        } catch (error) {
            console.error('Erreur:', error);
        }
    });
}

function updateProfileUI(userData) {
    const monnaieElement = document.querySelector('.currency-amount');
    const levelElement = document.querySelector('.level-text');
    const progressBar = document.querySelector('.progress');
    const avatarElement = document.querySelector('.profile-image');
    const pseudoElement = document.querySelector('.pseudo');
    const titreElement = document.querySelector('.titre');

    console.log(userData);

    if (monnaieElement) {
        monnaieElement.textContent = `Monnaie : ${userData.monnaie_utilisateur.toLocaleString()} credits`;
    }
    if (levelElement) {
        levelElement.textContent = `Level ${userData.lvl_utilisateur} (${userData.xp_utilisateur.toLocaleString()} / 1000 xp)`;
    }
    if (progressBar) {
        progressBar.style.width = `${(userData.xp_utilisateur / 1000) * 100}%`;
    }
    if (avatarElement) {
        avatarElement.src = `/avatars/${userData.avatar_utilisateur}`;
    }
    if (pseudoElement) {
        pseudoElement.textContent = `${userData.pseudo_utilisateur.toLocaleString()}`;
    }
    if (titreElement) {
        titreElement.textContent = `${userData.titre_utilisateur.toLocaleString()}`;
    }
}