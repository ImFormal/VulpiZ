import { auth } from '../firebase/firebaseConfig.js';
import { onAuthStateChanged, onIdTokenChanged, signOut } from "firebase/auth";

export function initializeAuthManager() {
    console.log("Initialisation de l'AuthManager");
    
    // Écoute les modifications du token (inclut la désactivation/suppression du compte)
    onIdTokenChanged(auth, async (user) => {
        if (user) {
            try {
                await user.getIdToken(true);
            } catch (error) {
                // Si on ne peut pas obtenir le token, le compte a probablement été désactivé/supprimé
                console.log("Compte désactivé ou supprimé");
                await signOut(auth);
                window.location.href = '/connexion';
            }
        }
    });
    
    // Gestion normale de l'authentification
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