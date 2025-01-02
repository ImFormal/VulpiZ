import { auth } from '../firebase/firebaseConfig.js';
import { onAuthStateChanged, signOut } from "firebase/auth";


export function initializeAuthManager() {
    console.log("Initialisation de l'AuthManager");
    
    // Gestion de l'authentification
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if(!user.emailVerified){
                signOut(auth);
                return;
            }
            if (document.getElementById('userEmail')) {
                document.getElementById('userEmail').textContent = user.email;
            }
        } else {
            window.location.href = '/connexion';
        }
    });

    // Gestion de la déconnexion
    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await signOut(auth);
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '/connexion';
            } catch (error) {
                console.error("Erreur lors de la déconnexion:", error);
            }
        });
    }
}

